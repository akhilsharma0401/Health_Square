"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { showSuccess, showError } from "@/src/components/toaster";
import { callApi } from "@/src/api";
import constant from "@/src/env";
import { FaUserShield } from "react-icons/fa";
import Image from "next/image";

const AdminLogin = ({ usersData }) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpId, setOtpId] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [timer, setTimer] = useState(20);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let interval;
    if (showOtp && timer > 1) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 1) {
      clearInterval(interval);
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [showOtp, timer]);

  const isValidMobile = (number) => /^[0-9]{10}$/.test(number);

  const sendOTP = async () => {
    try {
      if (!isValidMobile(mobile)) {
        showError("Enter only Admin number");
        return;
      }

      const data = { mobile, type: "auth" };

      const res = await callApi(
        constant.API.ADMIN.SENDOTP,
        "POST",
        data
      );

    


      if (res.status === true) {
        showSuccess(res.message);


        if (res.otpId) {
          setOtpId(res.otpId);
        }




        setShowOtp(true);
        setTimer(20);
        setCanResend(false);
      } else {
        // e.g. { status: false, message: "Admin not registered or not authorized." }
        showError(res?.message || "Admin not registered or not authorized.");
      }
    } catch (error) {
      console.log(error);
      showError("Something went wrong. Please try again.");
    }
  };

  const isValidOtp = (code) => /^[0-9]{6}$/.test(code);

  const verifyOTP = async () => {

    try {
      if (!isValidOtp(otp)) {
        showError("Please enter a valid OTP");
        return;
      }

      const data = { mobile, otp, otpId, type: "auth" };
      const response = await callApi(
        constant.API.ADMIN.VERIFYOTP,
        "POST",
        data
      );

      // /api/user/verifyotp returns HTTP 200 with `status: true` for BOTH a
      // correct and an incorrect OTP — it only means "request accepted", not
      // "OTP matched" (confirmed: a wrong OTP returns
      // { status: true, message: "Invalid OTP." }). Trusting `status` alone
      // here would let a wrong OTP log someone into the admin panel, so the
      // response message must be checked for a failure keyword too.
      const message = String(response?.message || "");
      const looksLikeFailure = /invalid|incorrect|wrong|expired|fail|error/i.test(
        message
      );
      const verified = response?.status === true && !looksLikeFailure;

      if (!verified) {
        showError(
          response?.status === false
            ? response?.message || "Something went wrong. Please try again."
            : "Invalid OTP. Please enter the correct OTP."
        );
        return;
      }

      showSuccess("Welcome to admin");
      try {
        sessionStorage.setItem("logintype", "admin");
        if (response?.token) sessionStorage.setItem("token", response.token);
      } catch {
        // sessionStorage unavailable (e.g. private browsing) — the admin
        // pages' own guard will redirect back here in that case.
      }
      router.push("/admin/viewblogs");
    } catch (error) {
      console.log(error);
      showError("Something went wrong. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showOtp) sendOTP();
  };

  const handleResend = () => {
    sendOTP();
    setOtp("");
    setTimer(20);
    setCanResend(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#C2EBFF] px-4 ">
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden w-full max-w-4xl grid md:grid-cols-[46%_54%] transition-all">
        <div className="px-10 py-8 flex flex-col justify-center items-center space-y-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0E76CD] via-[#00A859] to-[#0E76CD] text-transparent bg-clip-text flex items-center gap-3">
            <FaUserShield className="text-4xl text-[#0E76CD] drop-shadow-md" />
            Admin Login
          </h2>

          <p className="text-gray-500 text-center text-sm">
            Enter your registered mobile number to receive an OTP.
          </p>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {!showOtp ? (
              <>
                <input
                  type="tel"
                  placeholder="Enter Mobile Number"
                  value={mobile}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/^\d{0,10}$/.test(input)) setMobile(input);
                  }}
                  className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 transition-all outline-none"
                  required
                />
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-6 py-3 cursor-pointer thmbtn rounded-full"
                  >
                    Send OTP
                  </button>
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/^\d{0,6}$/.test(input)) setOtp(input);
                  }}
                  className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-400 transition-all outline-none"
                  required
                />

                {!canResend ? (
                  <p className="text-sm text-red-500 text-center">
                    Resend OTP in <b>{timer}s</b>
                  </p>
                ) : (
                  <p
                    className="text-sm text-blue-500 text-center cursor-pointer hover:underline"
                    onClick={handleResend}
                  >
                    Didn&apos;t receive OTP?{" "}
                    <span className="font-semibold">Resend</span>
                  </p>
                )}

                <div className="text-center">
                  <button
                    type="button"
                    onClick={verifyOTP}
                    className="px-6 py-3 thmbtn cursor-pointer thmbtn rounded-full"
                  >
                    Verify OTP
                  </button>
                </div>
              </>
            )}
          </form>
        </div>

        <div className="hidden md:block relative h-[512px] overflow-hidden">
          <Image
            src="/admin.png"
            alt="Background"
            fill
            className="absolute inset-0 w-full h-full object-cover"
            priority
          />
          <div className="relative h-full flex flex-col justify-center items-center text-white px-6 text-center">
            <h2 className="absolute top-[20%] w-full text-center text-3xl font-bold leading-snug">
              Welcome
              <br />
              To Health Square
            </h2>
            <p className="absolute bottom-6 w-full text-center text-sm px-6">
              Please enter your registered mobile number
              <br />
              to access the admin Blogs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
