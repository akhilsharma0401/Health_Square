// "use client";

// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { callApi } from "@/src/api";
// import constant from "@/src/env";
// import { showSuccess, showError } from "@/src/components/toaster";
// import { motion } from "framer-motion";
// import Link from "next/link";

// export default function AppointmentForm() {
//   const [otpVisible, setOtpVisible] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [timer, setTimer] = useState(0);
//   const [otp, setOtp] = useState("");
//   const [captcha, setCaptcha] = useState("");
//   const [userCaptcha, setUserCaptcha] = useState("");

//   useEffect(() => {
//     generateCaptcha();
//   }, []);

//   const generateCaptcha = () => {
//     const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
//     let randomStr = "";
//     for (let i = 0; i < 5; i++) {
//       randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     setCaptcha(randomStr);
//   };

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setError,
//     clearErrors,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const firstError = Object.keys(errors)[0]; // show only first error
//   const mobile = watch("mobile");

//   useEffect(() => {
//     let interval;
//     if (timer > 0) interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     return () => clearInterval(interval);
//   }, [timer]);

//   const handleSendOtp = async () => {
//     if (!mobile || mobile.length !== 10) {
//       setError("mobile", { message: "Please enter a valid 10-digit mobile number." });
//       return;
//     }
//     try {
//       setLoading(true);
//       const res = await callApi(constant.API.USER.SENDOTP, "POST", { mobile });
//       if (res?.status || res?.message) {
//         setOtp("");
//         setOtpVisible(true);
//         setTimer(30);
//         showSuccess(res.message || "OTP sent successfully!");
//       } else showError(res.message || "Failed to send OTP.");
//     } catch (err) {
//       showError(err.message || "Failed to send OTP.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     if (!otp || otp.length !== 6)
//       return showError("Please enter a valid 6-digit OTP.");
//     try {
//       setLoading(true);
//       const res = await callApi(constant.API.USER.VERIFYOTP, "POST", { mobile, otp });
//       if (res?.verified || res?.status) {
//         setOtpVerified(true);
//         setOtpVisible(false);
//         showSuccess("OTP verified successfully!");
//         clearErrors("otp");
//       } else showError("Invalid OTP. Try again.");
//     } catch (err) {
//       showError(err.message || "Verification failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onSubmit = async (data) => {
//     if (userCaptcha.toUpperCase() !== captcha) {
//       showError("Invalid CAPTCHA. Please try again.");
//       generateCaptcha();
//       return;
//     }
//     if (!otpVerified) return showError("Please verify your mobile number first.");

//     try {
//       setLoading(true);
//       const res = await callApi(constant.API.USER.USERINQUIRE, "POST", data);
//       showSuccess(res.message || "Inquiry submitted successfully!");
//       reset();
//       setOtp("");
//       setOtpVisible(false);
//       setOtpVerified(false);
//       setTimer(0);
//     } catch (err) {
//       showError(err.message || "Submission failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//             <style jsx>{`
//       .form-error {
//         font-size: 12px;
//         color: #ef4444;
//         margin-top: 2px;
//         line-height: 1.2;
//         min-height: 16px;
//       }
//     `}</style>
//         {/* Name */}
//         <div className="flex flex-col">
//           <input
//             type="text"
//             placeholder="Name *"
//             {...register("name", { required: "Name is required" })}
//             className="inputcls"
//           />
//           {firstError === "name" && <p className="form-error">{errors.name?.message}</p>}
//         </div>

//         {/* Email */}
//         <div className="flex flex-col">
//           <input
//             type="email"
//             placeholder="Email *"
//             {...register("email", {
//               required: "Email is required",
//               pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
//             })}
//             className="inputcls"
//           />
//           {firstError === "email" && <p className="form-error">{errors.email?.message}</p>}
//         </div>

//         {/* Mobile + OTP */}
//         <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div className="flex flex-col">
//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
//               <input
//                 type="tel"
//                 maxLength={10}
//                 placeholder="Enter Mobile Number"
//                 {...register("mobile", {
//                   required: "Mobile number is required",
//                   pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid 10-digit mobile number" },
//                 })}
//                 readOnly={otpVerified}
//                 className="flex-1 inputcls"
//               />
//               {!otpVerified && (
//                 <button
//                   type="button"
//                   onClick={handleSendOtp}
//                   disabled={mobile?.length !== 10 || loading || timer > 0}
//                   className={`px-4 sm:px-5 py-2 sm:py-3 rounded-full bg-[#0E76CD] text-white text-sm font-medium shadow-md ${
//                     mobile?.length === 10 && timer === 0
//                       ? "hover:scale-105 transition"
//                       : "opacity-50 cursor-not-allowed"
//                   }`}
//                 >
//                   {timer > 0 ? `Resend` : "Send OTP"}
//                 </button>
//               )}
//             </div>
//             {firstError === "mobile" && <p className="form-error">{errors.mobile?.message}</p>}
//             {!otpVerified && timer > 0 && (
//               <p className="text-xs sm:text-sm text-red-600 mt-1">
//                 You can resend OTP in 00:{timer.toString().padStart(2, "0")}
//               </p>
//             )}
//           </div>

//           {!otpVisible ? (
//             <>
//               <div className="flex flex-col">
//                 <select
//                   {...register("department", { required: "Please select a department" })}
//                   className="inputcls"
//                 >
//                   <option value="">Select Department</option>
//                   <option value="dentalcare">DENTAL CARE</option>
//                   <option value="pharmacy">PHARMACY</option>
//                 </select>
//                 {firstError === "department" && (
//                   <p className="form-error">{errors.department?.message}</p>
//                 )}
//               </div>

//               <div className="flex flex-col">
//                 <input
//                   type="date"
//                   {...register("date", {
//                     required: "Date is required",
//                     validate: (value) => {
//                       const today = new Date();
//                       const selected = new Date(value);
//                       today.setHours(0, 0, 0, 0);
//                       return selected >= today || "Please select today or a future date.";
//                     },
//                   })}
//                   className="inputcls"
//                 />
//                 {firstError === "date" && <p className="form-error">{errors.date?.message}</p>}
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="flex flex-col">
//                 <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
//                   <input
//                     type="tel"
//                     placeholder="Enter 6-digit OTP"
//                     maxLength={6}
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
//                     className="flex-1 inputcls"
//                   />
//                   <button
//                     type="button"
//                     onClick={handleVerifyOtp}
//                     disabled={otp.length !== 6 || loading}
//                     className={`px-4 sm:px-5 py-2 sm:py-3 rounded-full text-white text-sm font-medium shadow-md ${
//                       otp.length === 6
//                         ? "bg-[#0E76CD] hover:scale-105 transition"
//                         : "bg-gray-400 cursor-not-allowed"
//                     }`}
//                   >
//                     {loading ? "Verifying..." : "Verify OTP"}
//                   </button>
//                 </div>
//               </div>

//               <div className="flex flex-col">
//                 <select
//                   {...register("department", { required: "Please select a department" })}
//                   className="inputcls"
//                 >
//                   <option value="">Select Department</option>
//                   <option value="dentalcare">DENTAL CARE</option>
//                   <option value="pharmacy">PHARMACY</option>
//                 </select>
//                 {firstError === "department" && (
//                   <p className="form-error">{errors.department?.message}</p>
//                 )}
//               </div>

//               <div className="flex flex-col">
//                 <input
//                   type="date"
//                   {...register("date", {
//                     required: "Date is required",
//                     validate: (value) => {
//                       const today = new Date();
//                       const selected = new Date(value);
//                       today.setHours(0, 0, 0, 0);
//                       return selected >= today || "Please select today or a future date.";
//                     },
//                   })}
//                   className="inputcls"
//                 />
//                 {firstError === "date" && <p className="form-error">{errors.date?.message}</p>}
//               </div>
//             </>
//           )}
//         </div>

//         {/* Message */}
//         <textarea
//           placeholder="How can we help?"
//           rows="4"
//           {...register("message")}
//           className="w-full sm:col-span-2 bg-white/70 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 inputcls"
//         ></textarea>

//         {/* CAPTCHA */}
//         <div className="sm:col-span-2 flex flex-col gap-2 mt-2">
//           <div className="flex items-center gap-3">
//             <div className="w-1/4 px-4 py-2 bg-gray-100 text-lg font-semibold tracking-widest rounded-lg border border-gray-300 text-center select-none">
//               {captcha}
//             </div>
//             <div className="w-3/4 flex items-center gap-2">
//               <input
//                 type="text"
//                 placeholder="Enter CAPTCHA"
//                 value={userCaptcha}
//                 onChange={(e) => setUserCaptcha(e.target.value.toUpperCase())}
//                 className="inputcls w-full"
//               />
//               <button
//                 type="button"
//                 onClick={generateCaptcha}
//                 className="text-[#0070C9] text-sm font-medium underline cursor-pointer hover:text-[#005fa3]"
//               >
//                 Refresh
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Terms */}
//         <div className="sm:col-span-2 flex flex-col">
//           <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
//             <input
//               type="checkbox"
//               {...register("terms", { required: "Please accept Terms & Conditions" })}
//               className="w-4 h-4 accent-[#04A868] cursor-pointer"
//             />
//             <span className="text-gray-600 text-sm">
//               I agree to all{" "}
//               <Link
//                 href="/tnc"
//                 className="text-[#0070C9] underline hover:text-[#005fa3] transition-colors"
//               >
//                 Terms and Conditions
//               </Link>
//               .
//             </span>
//           </label>
//           {firstError === "terms" && <p className="form-error">{errors.terms?.message}</p>}
//         </div>

//         {/* Submit */}
//         <div className="text-center sm:text-start">
//           <button
//             type="submit"
//             className="relative thmbtn overflow-hidden bg-[#0072CE] text-white font-semibold py-3 px-10 rounded-full shadow-md transition-all duration-500 ease-in-out group w-full sm:w-auto"
//           >
//             <span className="relative z-10">
//               {loading ? "Submitting..." : "SUBMIT FORM"}
//             </span>
//             <span className="absolute inset-0 bg-[#00B388] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
//           </button>
//         </div>
//       </form>
//   );
// }
















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
        otpId,
        otp,
      });

      if (res?.verified || res?.status) {
        setOtpVerified(true);
        setOtpVisible(false);
        clearErrors("otp");
        setFormError("");
      } else {
        setError("otp", { type: "manual", message: "Invalid OTP. Try again." });
      }
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
          className="inputcls"
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
          className="inputcls"
        />
        {firstErrorKey === "email" && (
          <p className="form-error">{errors.email?.message}</p>
        )}
      </div>


      <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="tel"
              maxLength={10}
              placeholder="Enter Mobile Number"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter valid 10-digit mobile number",
                },
              })}
              readOnly={otpVerified}
              className="flex-1 inputcls"
            />

            {!otpVerified && (
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
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
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
      </div>

  
      <textarea
        placeholder="How can we help?"
        rows="4"
        {...register("message")}
        className="w-full sm:col-span-2 inputcls"
      ></textarea>

      
      <div className="sm:col-span-2">
        <div className="flex gap-3 items-center">
          <div className="px-4 py-2 bg-gray-200 rounded-lg text-lg tracking-widest">
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
          className="relative bg-[#0072CE] cursor-pointer text-white font-semibold py-3 px-10 rounded-full flex items-center justify-center gap-2"
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
