"use client";
import React, { useState } from "react";
import { User, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import axios from "axios";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import RegisterPageUi from "@/components/RegisterPageUi";

export default function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [OtpPanel, setOtpPanel] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const router = useRouter();

  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const verifyEmail = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        SERVER_URL + "/sendEmailVerificationOtp",
        {
          email,
        },
        {
          withCredentials: true, // same as credentials: "include"
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!res.data.success) {
        alert(res.data.message);
        return;
      }

      const templateParams = {
        email,
        passcode: res.data.otp,
      };

      emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID, // your service ID
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID, // your template ID
        templateParams,
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_ID, // your public key
      );

      toast.success(res.data.message);
      setLoading(false);
      setOtpPanel(true);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setVerifyingOtp(true);
    setLoading(true);
    setAuthError("");

    try {
      const res = await axios.post(
        SERVER_URL + "/register",
        {
          name,
          surname,
          email,
          password,
          otp,
        },
        {
          withCredentials: true, // same as credentials: "include"
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = res.data;

      if (!data.success) {
        setAuthError(data.message);
        toast.error(data.message);
        setVerifyingOtp(false);
        setLoading(false);
      } else {
        setLoading(false);
        toast.success(data.message);
        router.push("/login");
      }
    } catch (error) {
      console.error("Register error:", error);

      setLoading(false);
      setAuthError(
        error.response?.data?.message || "Something went wrong. Try again.",
      );
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* LEFT SIDE - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        {OtpPanel ? (
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Verify your email
            </h2>
            <p className="text-slate-600 mb-6">
              We have sent a 6-digit verification code to
              <span className="font-semibold"> {email}</span>
            </p>

            <div className="space-y-4">
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="Enter 6 digit OTP"
                className="w-full text-center tracking-widest text-2xl py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />

              <button
                onClick={handleRegister}
                disabled={verifyingOtp}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {verifyingOtp ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </button>

              <button
                onClick={verifyEmail}
                className="w-full text-sm text-indigo-600 hover:text-indigo-700"
              >
                Resend OTP
              </button>

              <button
                onClick={() => setOtpPanel(false)}
                className="w-full text-sm text-slate-500 hover:text-slate-700"
              >
                ← Back to register
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-2xl mt-15">
            {/* Heading */}
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Create your account
              </h1>
            </div>

            {/* Register Form */}
            <div className="space-y-5">
              {/* Name & Surname */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Jethalal"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Gada"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="gadaelectronics@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Must be at least 8 characters with uppercase, lowercase, and
                  numbers
                </p>
              </div>

              {/* Error Message */}
              {authError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{authError}</p>
                </div>
              )}

              {/* Register Button */}
              <button
                onClick={verifyEmail}
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <a
                href={`${SERVER_URL}/auth/google/callback`}
                className="flex items-center justify-center gap-3 w-full border border-slate-300 py-2.5 rounded-lg hover:bg-slate-50 transition font-medium"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </a>
            </div>

            {/* Login Link */}
            <p className="mt-8 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        )}
      </div>

      {/* RIGHT SIDE - Hero Section */}
      <RegisterPageUi />
    </div>
  );
}
