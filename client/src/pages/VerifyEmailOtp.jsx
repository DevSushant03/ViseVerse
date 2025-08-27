import { useState, useRef, useEffect } from "react";
import { Mail, Shield, CheckCircle } from "lucide-react";

export default function VerifyEmailOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index, value) => {
    // Only allow single digit
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
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

    // Focus next empty input or last input
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsVerifying(true);
    setError("");

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate verification (you can replace with actual API call)
      if (otpString === "123456") {
        setIsVerified(true);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setIsVerified(false);
    inputRefs.current[0]?.focus();
    // Add resend logic here
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-800 flex items-center justify-center p-4">
        <div className="w-full mt-20 max-w-md">
          {/* Success Card */}
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
                Email Verified!
              </h1>

              <p className="text-purple-200 mb-8">
                Your email has been successfully verified. You can now access
                your account.
              </p>

              <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-purple-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Continue to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-800 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative mt-20 w-full max-w-md">
        {/* Main Card */}
        <div
          className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{
                background: "rgba(168, 85, 247, 0.3)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              <Mail className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">
              Verify Your Email
            </h1>

            <p className="text-purple-200 text-sm">
              We've sent a 6-digit code to your email address
            </p>

            <p className="text-purple-300 font-medium mt-1">user@example.com</p>
          </div>

          {/* OTP Input */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-4 text-center">
              Enter Verification Code
            </label>

            <div className="flex gap-3 justify-center mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="\d"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 text-center text-xl font-bold rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                  style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                  maxLength={1}
                />
              ))}
            </div>

            {error && (
              <p
                className="text-red-300 text-sm text-center mb-4 rounded-lg py-2 px-4"
                style={{
                  background: "rgba(239, 68, 68, 0.2)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                }}
              >
                {error}
              </p>
            )}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={isVerifying || otp.join("").length !== 6}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100 transition-all duration-200 shadow-lg mb-4 flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Verifying...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                Verify Email
              </>
            )}
          </button>

          {/* Resend */}
          <div className="text-center">
            <p className="text-purple-200 text-sm mb-2">
              Didn't receive the code?
            </p>

            <button
              onClick={handleResend}
              className="text-purple-300 hover:text-white font-medium text-sm underline underline-offset-2 hover:underline-offset-4 transition-all duration-200"
            >
              Resend Code
            </button>
          </div>
        </div>

        {/* Helper text */}
        <div className="text-center mt-6">
          <p className="text-purple-300 text-xs">
            Enter "123456" to test the verification process
          </p>
        </div>
      </div>
    </div>
  );
}
