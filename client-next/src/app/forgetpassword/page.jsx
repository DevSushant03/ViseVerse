"use client";
import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Shield,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

import axios from "axios";

import { toast } from "react-toastify";
export default function ForgetPasswordFlow() {
  const [currentStep, setCurrentStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const router = useRouter();

  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  useEffect(() => {
    if (currentStep === 2 && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [currentStep]);

  // Email Step Functions
  const handleEmailSubmit = async () => {
    if (!email) {
      toast.warning("Email required !");
      setError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warning("Invalid Email !");
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call
    try {
      const res = await axios.post(
        SERVER_URL + "/sendResetOtp",
        { email },
        { withCredentials: true },
      );

      if (res.data.success) {
        const templateParams = {
          email,
          passcode: res.data.otp,
        };

        emailjs
          .send(
            import.meta.env.VITE_EMAIL_SERVICE_ID, // your service ID
            import.meta.env.VITE_EMAIL_TEMPLATE_ID, // your template ID
            templateParams,
            import.meta.env.VITE_EMAIL_PUBLIC_ID, // your public key
          )
          .then((result) => {
            toast.info(res.data.message);
            setCurrentStep(2);
          })
          .catch((error) => {
            toast.info("Failed to send OTP");
          });
      } else {
        toast.info("Failed to send OTP , Server error");
      }
    } catch (err) {
      toast.error("Failed to send reset code. Please try again.");
      setError("Failed to send reset code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // OTP Step Functions
  const handleInputChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/\d/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleOTPVerify = async () => {
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      if (otpString) {
        const res = await axios.post(
          SERVER_URL + "/verifyOtp",
          { otpString, email },
          { withCredentials: true },
        );
        console.log(res);
        if (!res.data.success) {
          setError(res.data.message);
        }
        setCurrentStep(3);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Password Step Functions
  const handlePasswordSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      const res = await axios.post(
        SERVER_URL + "/resetPassword",
        { confirmPassword, email },
        { withCredentials: true },
      );
      if (!res.data.success) {
        setError(res.data.message);
      }
      setCurrentStep(4);
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };

  const handleBackToLogin = () => {
    // Reset all states
    setCurrentStep(1);
    setEmail("");
    setOtp(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setIsLoading(false);

    router.push("/login");
  };

  // Success Step
  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-800 flex items-center justify-center p-4">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        <div className="relative w-full mt-20 max-w-md">
          <div
            className="rounded-3xl p-8 shadow-2xl border"
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            }}
          >
            <div className="text-center">
              <div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                style={{
                  background: "rgba(34, 197, 94, 0.2)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>

              <h1 className="text-3xl font-bold text-white mb-4">
                Password Reset!
              </h1>

              <p className="text-purple-200 mb-8">
                Your password has been successfully reset. You can now sign in
                with your new password.
              </p>

              <button
                onClick={handleBackToLogin}
                className="w-full bg-gradient-to-r cursor-pointer from-purple-500 to-indigo-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-purple-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Progress */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-1.5 w-10 rounded-full ${
                step <= currentStep ? "bg-indigo-600" : "bg-slate-200"
              }`}
            />
          ))}
        </div>

        {/* Back */}
        {(currentStep === 2 || currentStep === 3) && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="flex items-center text-sm text-slate-600 hover:text-black mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </button>
        )}

        {/* STEP 1 */}
        {currentStep === 1 && (
          <>
            <h1 className="text-2xl font-bold text-center mb-2">
              Forgot Password
            </h1>
            <p className="text-center text-slate-500 text-sm mb-6">
              Enter your email to receive a reset code
            </p>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button
              onClick={handleEmailSubmit}
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              {isLoading ? "Sending..." : "Send Reset Code"}
            </button>
          </>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <>
            <h1 className="text-2xl font-bold text-center mb-2">Verify Code</h1>
            <p className="text-center text-slate-500 text-sm mb-6">
              Enter the 6-digit code sent to <b>{email}</b>
            </p>

            <div className="flex justify-center gap-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
            )}

            <button
              onClick={handleOTPVerify}
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </button>
          </>
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <>
            <h1 className="text-2xl font-bold text-center mb-2">
              New Password
            </h1>
            <p className="text-center text-slate-500 text-sm mb-6">
              Create a new password for your account
            </p>

            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
              className="w-full border rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full border rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button
              onClick={handlePasswordSubmit}
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
