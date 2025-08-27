import { useState, useRef, useEffect } from "react";
import {
  Mail,
  Shield,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    if (currentStep === 2 && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [currentStep]);

  // Email Step Functions
  const handleEmailSubmit = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCurrentStep(2);
    } catch (err) {
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
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (otpString === "123456") {
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
      await new Promise((resolve) => setTimeout(resolve, 1500));
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

    navigate("/login");
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
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-purple-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-indigo-800 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-8 h-1 rounded-full transition-all duration-300 ${
                  step <= currentStep
                    ? "bg-gradient-to-r from-purple-400 to-indigo-500"
                    : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Card */}
        <div
          className="rounded-3xl mt-20 p-8 shadow-2xl border"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          }}
        >
          {/* Back button for steps 2 and 3 */}
          {(currentStep === 2 || currentStep === 3) && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="mb-4 flex items-center text-purple-200 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          )}

          {/* Step 1: Email Entry */}
          {currentStep === 1 && (
            <>
              <div className="text-center mb-8">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{
                    background: "rgba(168, 85, 247, 0.3)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
                >
                  <Lock className="w-8 h-8 text-white" />
                </div>

                <h1 className="text-3xl font-bold text-white mb-2">
                  Forgot Password?
                </h1>

                <p className="text-purple-200 text-sm">
                  No worries! Enter your email address and we'll send you a
                  reset code.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                    style={{
                      background: "rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                    placeholder="Enter your email"
                  />
                </div>

                {error && (
                  <p
                    className="text-red-300 text-sm text-center rounded-lg py-2 px-4"
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

                <button
                  onClick={handleEmailSubmit}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Sending Code...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Send Reset Code
                    </>
                  )}
                </button>
              </div>
            </>
          )}

          {/* Step 2: OTP Verification */}
          {currentStep === 2 && (
            <>
              <div className="text-center mt-20 mb-8">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{
                    background: "rgba(168, 85, 247, 0.3)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
                >
                  <Shield className="w-8 h-8 text-white" />
                </div>

                <h1 className="text-3xl font-bold text-white mb-2">
                  Verify Reset Code
                </h1>

                <p className="text-purple-200 text-sm">
                  We've sent a 6-digit code to
                </p>

                <p className="text-purple-300 font-medium mt-1">{email}</p>
              </div>

              <div className="mb-6">
                <label className="block text-white text-sm font-medium mb-4 text-center">
                  Enter Reset Code
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

              <button
                onClick={handleOTPVerify}
                disabled={isLoading || otp.join("").length !== 6}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100 transition-all duration-200 shadow-lg mb-4 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Verify Code
                  </>
                )}
              </button>

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
            </>
          )}

          {/* Step 3: New Password */}
          {currentStep === 3 && (
            <>
              <div className="text-center mt-20 mb-8">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                  style={{
                    background: "rgba(168, 85, 247, 0.3)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
                >
                  <Lock className="w-8 h-8 text-white" />
                </div>

                <h1 className="text-3xl font-bold text-white mb-2">
                  Create New Password
                </h1>

                <p className="text-purple-200 text-sm">
                  Please create a strong password for your account.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                      style={{
                        background: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                      }}
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                      style={{
                        background: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                      }}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors duration-200"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <p
                    className="text-red-300 text-sm text-center rounded-lg py-2 px-4"
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

                <button
                  onClick={handlePasswordSubmit}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      Resetting Password...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Reset Password
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Helper text for testing */}
        {currentStep === 2 && (
          <div className="text-center mt-6">
            <p className="text-purple-300 text-xs">
              Enter "123456" to test the verification process
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
