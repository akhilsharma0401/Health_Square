"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { callApi } from "@/src/api";
import constant from "@/src/env";
import { showSuccess } from "@/src/components/toaster";
import Link from "next/link";
import { FiLoader } from "react-icons/fi";

export default function AppointmentForm() {
  const [otpVisible, setOtpVisible] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
    const [sendOtpLoading, setSendOtpLoading] = useState(false);
const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
const [submitLoading, setSubmitLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otp, setOtp] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [formError, setFormError] = useState(""); 
   const [otpId, setOtpId] = useState(null);


  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let randomStr = "";
    for (let i = 0; i < 5; i++) {
      randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(randomStr);
  };

 
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: "firstError",
  });

  const firstErrorKey = Object.keys(errors)[0];
  const mobile = watch("mobile");

  // Name/Email/Mobile are locked the moment "Send OTP" is clicked (so there's
  // no edit window while the request is in flight) and stay locked while the
  // resend countdown is running. Once "Resend OTP in 0" is reached (timer
  // hits 0) and the OTP still isn't verified, they unlock again so the user
  // can correct details before resending. They lock permanently once verified.
  const contactDetailsLocked =
    sendOtpLoading || otpVerified || (otpVisible && timer > 0);

  useEffect(() => {
    let interval;
    if (timer > 0)
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);


  const handleSendOtp = async () => {
    if (!mobile || mobile.length !== 10) {
      setError("mobile", {
        type: "manual",
        message: "Please enter a valid 10-digit mobile number.",
      });
      return;
    }

    try {
     setSendOtpLoading(true);
      const res = await callApi(constant.API.USER.SENDOTP, "POST", { mobile });

      if (res?.status) {
        setOtp("");
        setOtpId(res.otpId || null);
        setOtpVisible(true);
        setOtpVerified(false); // a fresh OTP invalidates any prior verification
        setTimer(30);
        // showSuccess("OTP sent successfully!");
      } else {
        setError("mobile", {
          type: "manual",
          message: res?.message || "Failed to send OTP.",
        });
      }
    } finally {
     setSendOtpLoading(false);
    }
  };


  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError("otp", {
        type: "manual",
        message: "Please enter a valid 6-digit OTP.",
      });
      return;
    }

    try {
      setVerifyOtpLoading(true);
      const res = await callApi(constant.API.USER.VERIFYOTP, "POST", {
        mobile,
        otpId,
        otp,
        type: "auth",
      });

      // The verifyotp API returns HTTP 200 with `status: true` for BOTH a
      // correct and an incorrect OTP — it only means "request accepted", not
      // "OTP matched" (confirmed: a wrong OTP returns
      // { status: true, message: "Invalid OTP." }). The only reliable signal
      // is the response message itself, so a request-level `status: false`
      // or a message containing a failure keyword must both be treated as
      // "not verified" — never default to verified.
      const message = String(res?.message || "");
      const looksLikeFailure = /invalid|incorrect|wrong|expired|fail|error/i.test(
        message
      );
      const isVerified = res?.status === true && !looksLikeFailure;

      if (isVerified) {
        setOtpVerified(true);
        setOtpVisible(false);
        clearErrors("otp");
        setFormError("");
        showSuccess("OTP Verified Successfully");
      } else {
        setOtpVerified(false);
        setError("otp", {
          type: "manual",
          message: "Invalid OTP. Please enter the correct OTP.",
        });
      }
    } catch (err) {
      setOtpVerified(false);
      setError("otp", {
        type: "manual",
        message: "OTP verification failed.",
      });
    } finally {
      setVerifyOtpLoading(false);
    }
  };


  const onSubmit = async (data) => {
    setFormError(""); // reset global error

    if (userCaptcha.toUpperCase() !== captcha) {
      setError("userCaptcha", {
        type: "manual",
        message: "Invalid CAPTCHA. Please try again.",
      });
      generateCaptcha();
      return;
    }

    if (!otpVerified) {
      setFormError("Please verify your mobile number first."); 
      return;
    }

    try {
      setSubmitLoading(true);
      const res = await callApi(constant.API.USER.USERINQUIRE, "POST", data);

      showSuccess(res.message || "Inquiry submitted successfully!");

      reset();
      setOtp("");
      setOtpVisible(false);
      setOtpVerified(false);
      setTimer(0);
      setUserCaptcha("");
      generateCaptcha();
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
    >
      <style jsx>{`
        .form-error {
          font-size: 12px;
          color: #ef4444;
          margin-top: 2px;
        }
      `}</style>

      {/* NAME */}
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Name *"
          {...register("name", { required: "Name is required" })}
          disabled={contactDetailsLocked}
          className="inputcls disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
        />
        {firstErrorKey === "name" && (
          <p className="form-error">{errors.name?.message}</p>
        )}
      </div>

      {/* EMAIL */}
      <div className="flex flex-col">
        <input
          type="email"
          placeholder="Email *"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
          disabled={contactDetailsLocked}
          className="inputcls disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
        />
        {firstErrorKey === "email" && (
          <p className="form-error">{errors.email?.message}</p>
        )}
      </div>


      <div className="col-span-full grid grid-cols-1  gap-4">
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="tel"
              inputMode="numeric"
              maxLength={15}
              placeholder="Enter Mobile Number"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter valid 10-digit mobile number",
                },
                onChange: (e) => {
                  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
                },
              })}
              readOnly={contactDetailsLocked}
              disabled={contactDetailsLocked}
              className="flex-1 inputcls disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
            />
            <div>

            {otpVerified ? (
              <span className="px-5 py-3 rounded-full bg-green-100 text-green-700 text-sm font-medium flex items-center justify-center gap-1 whitespace-nowrap">
                ✓ Verified
              </span>
            ) : (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={mobile?.length !== 10 || sendOtpLoading || timer > 0}
                className={`px-5 py-3 rounded-full bg-[#0E76CD] text-white text-sm font-medium flex items-center justify-center gap-2 ${
                  mobile?.length === 10 && timer === 0
                    ? "hover:scale-105 transition"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                                  {sendOtpLoading ? (
                 <>

                   Sending<FiLoader className="animate-spin" />
                 </>
               ) : timer > 0 ? (
                 `Resend`
               ) : (
                 "Send OTP"
               )}
              </button>
            )}
            </div>
          </div>

          {firstErrorKey === "mobile" && (
            <p className="form-error">{errors.mobile?.message}</p>
          )}

          {!otpVerified && timer > 0 && (
            <p className="text-xs text-red-600 mt-1">
              Resend OTP in 00:{timer.toString().padStart(2, "0")}
            </p>
          )}
        </div>

        {otpVisible && (
          <div className="flex flex-col">
            <div className="flex gap-2">
              <input
                type="tel"
                inputMode="numeric"
                placeholder="Enter 6-digit OTP"
                maxLength={10}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="flex-1 inputcls"
              />

              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6 || verifyOtpLoading}
                className={`px-5 py-3 rounded-full text-white text-sm ${
                  otp.length === 6
                    ? "bg-[#0E76CD]"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {verifyOtpLoading ? (
                 <>
                   
                   Verifying<FiLoader className="animate-spin" />
                 </>
               ) : (
                 "Verify OTP"
               )}
              </button>
            </div>

            {firstErrorKey === "otp" && (
              <p className="form-error">{errors.otp?.message}</p>
            )}
          </div>
        )}

  
        
      </div>

      <div className="flex flex-col">
          <select
            {...register("department", {
              required: "Please select a department",
            })}
            className="inputcls"
          >
            <option value="">Select Department</option>
            <option value="dentalcare">DENTAL CARE</option>
            <option value="pharmacy">PHARMACY</option>
          </select>

          {firstErrorKey === "department" && (
            <p className="form-error">{errors.department?.message}</p>
          )}
        </div>


        <div className="flex flex-col">
          <input
            type="date"
            {...register("date", {
              required: "Date is required",
              validate: (value) => {
                const today = new Date();
                const selected = new Date(value);
                today.setHours(0, 0, 0, 0);
                return (
                  selected >= today || "Please select today or a future date."
                );
              },
            })}
            className="inputcls"
          />
          {firstErrorKey === "date" && (
            <p className="form-error">{errors.date?.message}</p>
          )}
        </div>

  
      <div className="flex flex-col w-full sm:col-span-2">
        <textarea
          placeholder="How can we help? *"
          rows="4"
          {...register("message", { required: "Please tell us how we can help" })}
          className="w-full inputcls"
        ></textarea>
        {firstErrorKey === "message" && (
          <p className="form-error">{errors.message?.message}</p>
        )}
      </div>


      <div className="sm:col-span-2">
        <div className="flex gap-3 items-center">
          <div
            className="px-4 py-2 bg-gray-200 rounded-lg text-lg tracking-widest select-none"
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
          >
            {captcha}
          </div>

          <input
            type="text"
            placeholder="Enter CAPTCHA"
            value={userCaptcha}
            onChange={(e) => {
              setUserCaptcha(e.target.value.toUpperCase());
              clearErrors("userCaptcha");
            }}
            className="inputcls w-full"
          />

          <button
            type="button"
            onClick={generateCaptcha}
            className="text-[#0070C9] underline"
          >
            Refresh
          </button>
        </div>

        {firstErrorKey === "userCaptcha" && (
          <p className="form-error">{errors.userCaptcha?.message}</p>
        )}
      </div>

  
      <div className="sm:col-span-2">
         <label className="flex gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("marketingOptIn", {
                    required: "Please accept to receive product updates and marketing communications",
                  })}
                  className="w-4 h-4 accent-[#04A868]"
                />
                <span className="text-gray-600 text-sm">
                  I agree to receive product updates and marketing communications from Health Square.
                </span>
              </label>
        {firstErrorKey === "marketingOptIn" && (
          <p className="form-error">{errors.marketingOptIn?.message}</p>
        )}
        <label className="flex gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register("terms", {
              required: "Please accept Terms & Conditions",
            })}
            className="w-4 h-4 accent-[#04A868]"
          />
          <span className="text-gray-600 text-sm">
            I agree to all{" "}
            <Link href="/tnc" className="text-[#0070C9] underline">
              Terms and Conditions
            </Link>
            .
          </span>
        </label>

        {firstErrorKey === "terms" && (
          <p className="form-error">{errors.terms?.message}</p>
        )}
      </div>


      {formError && (
        <p className="text-red-500 text-sm sm:col-span-2">{formError}</p>
      )}


      <div className="sm:col-span-2 text-start">
        <button
          type="submit"
          disabled={!otpVerified || submitLoading}
          title={!otpVerified ? "Verify your mobile number OTP first" : undefined}
          className={`relative text-white font-semibold py-3 px-10 rounded-full flex items-center justify-center gap-2 ${
            !otpVerified || submitLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#0072CE] cursor-pointer"
          }`}
        >
          {submitLoading ? (
           <>

             Submitting <FiLoader className="animate-spin" />
           </>
         ) : (
           "SUBMIT FORM"
         )}
        </button>
       
      </div>
    </form>
  );
}
