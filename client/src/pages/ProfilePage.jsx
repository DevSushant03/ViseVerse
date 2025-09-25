import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

import {
  Mail,
  User,
  Phone,
  MapPin,
  Edit2,
  Check,
  X,
  Shield,
  Lock,
  Delete,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import { toast } from "react-toastify";
import env from "dotenv";
env.config();

export default function ProfilePage() {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const [isEditing, setIsEditing] = useState(false);
  const [isAccountVerified, setisAccountVerified] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setloading] = useState(false);
  const [message, setmessage] = useState("");
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    number: "",
    location: "",
    gender: "",
  });
  const [tempProfile, setTempProfile] = useState({ ...profile });
  const navigate = useNavigate();

  useEffect(() => {
    setloading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(SERVER_URL + "/userData", {
          withCredentials: true,
        });

        const { name, email, number, location, gender, isAccountVerified } =
          res.data.message;
        const filterData = {
          name,
          email,
          number,
          location,
          gender,
        };
        setloading(false);
        setisAccountVerified(isAccountVerified);
        setProfile(filterData);
        setTempProfile(filterData);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setTempProfile({ ...profile });
  };

  const handleSave = () => {
    setProfile({ ...tempProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  const handleVerifyEmail = async () => {
    setShowVerification(true);
    // Simulate sending verification code

    const res = await axios.post(
      SERVER_URL + "/sendVerifyOtp",
      {},
      { withCredentials: true }
    );

    if (res.data.success) {
      console.log(res.data.email);
      const templateParams = {
        email: res.data.email,
        name: res.data.name,
        passcode: res.data.otp,
      };

      emailjs
        .send(
          import.meta.env.EMAIL_SERVICE_ID, // your service ID
          import.meta.env.EMAIL_TEMPLATE_ID, // your template ID
          templateParams,
          import.meta.env.EMAIL_PUBLIC_ID // your public key
        )
        .then((result) => {
          console.log(result);
          toast.info(res.data.message);
        })
        .catch((error) => {
          console.log(error);

          toast.info("Failed to send OTP");
        });
    } else {
      toast.info("Failed to send OTP , server error");
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();

    if (verificationCode) {
      const res = await axios.post(
        SERVER_URL + "/verifyEmail",
        { verificationCode },
        { withCredentials: true }
      );
      setmessage(res.data.message);
      if (res.data.success) {
        setisAccountVerified(true);
        setShowVerification(false);
        setVerificationCode("");
        toast.success("Account Verify Successfully");
      }
    } else {
      setmessage("Missing Details !");
    }
  };

  const logout = async () => {
    setloading(true);
    const res = await axios.post(
      SERVER_URL + "/logout",
      {},
      { withCredentials: true }
    );

    if (res.data.success) {
      localStorage.removeItem("isLoggedIn");
      navigate("/");
      toast.success("Logout Successfully");
      window.location.reload();
    }
  };
  const deleteAccount = async () => {
    const res = await axios.post(
      SERVER_URL + "/deleteAccount",
      {},
      { withCredentials: true }
    );

    if (res.data.success) {
      localStorage.removeItem("isLoggedIn");
      navigate("/");
      toast.success("Account Deleted Successfully");
      window.location.reload();
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <div className="max-w-4xl mt-20 mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
            Profile Dashboard
          </h1>
          <p className="text-purple-200">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-2 backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 p-8 shadow-2xl">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <span className="bg-green-400 px-4 rounded-full text-white text-4xl font-bold ">
                    {tempProfile.name.toUpperCase().split("", 1)}
                  </span>
                </div>
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempProfile.name}
                      onChange={(e) =>
                        setTempProfile({
                          ...tempProfile,
                          name: e.target.value,
                        })
                      }
                      className="text-2xl font-bold bg-transparent border-b border-white/50 text-white focus:outline-none focus:border-purple-400 mb-2"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {profile.name.toUpperCase()}
                    </h2>
                  )}
                </div>
              </div>

              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="bg-gradient-to-r cursor-pointer from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 cursor-pointer hover:bg-green-600 text-white p-3 rounded-xl transition-all transform hover:scale-105"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-red-500 hover:bg-red-600 cursor-pointer text-white p-3 rounded-xl transition-all transform hover:scale-105"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Profile Information */}
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-purple-200 text-sm font-medium flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </label>
                  <div className="flex items-center space-x-2">
                    {isEditing ? (
                      <input
                        type="email"
                        value={tempProfile.email}
                        onChange={(e) =>
                          setTempProfile({
                            ...tempProfile,
                            email: e.target.value,
                          })
                        }
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    ) : (
                      <>
                        <span className="text-white">{profile.email}</span>
                        {isAccountVerified ? (
                          <Shield className="w-4 h-4 text-green-400" />
                        ) : (
                          <button
                            onClick={handleVerifyEmail}
                            className="text-xs bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-black px-3 py-1 rounded-full font-medium transition-colors"
                          >
                            Verify
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-purple-200 text-sm font-medium flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={tempProfile.number}
                      onChange={(e) =>
                        setTempProfile({
                          ...tempProfile,
                          number: e.target.value,
                        })
                      }
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <span className="text-white">{profile.number}</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-purple-200 text-sm font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempProfile.location}
                    onChange={(e) =>
                      setTempProfile({
                        ...tempProfile,
                        location: e.target.value,
                      })
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <span className="text-white">
                    {profile.location.toUpperCase()}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-purple-200 text-sm font-medium flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Gender
                </label>
                {isEditing ? (
                  <textarea
                    value={tempProfile.gender}
                    onChange={(e) =>
                      setTempProfile({
                        ...tempProfile,
                        gender: e.target.value,
                      })
                    }
                    rows="3"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                ) : (
                  <p className="text-white">{profile.gender.toUpperCase()}</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {/* Verify Email Button */}
            <button
              onClick={handleVerifyEmail}
              disabled={isAccountVerified}
              className={`w-full cursor-pointer backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center space-x-3 ${
                isAccountVerified
                  ? "bg-green-500/20 border-green-400/30 cursor-not-allowed"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              <Shield
                className={`w-6 h-6 ${
                  isAccountVerified ? "text-green-400" : "text-purple-300"
                }`}
              />
              <span
                className={`text-lg font-semibold ${
                  isAccountVerified ? "text-green-300" : "text-white"
                }`}
              >
                {isAccountVerified ? "Email Verified ✓" : "Verify Email"}
              </span>
            </button>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="w-full cursor-pointer backdrop-blur-lg bg-red-500/20 border border-red-400/30 rounded-2xl p-6 shadow-2xl transition-all transform hover:scale-105 hover:bg-red-500/30 flex items-center justify-center space-x-3"
            >
              <Lock className="w-6 h-6 text-red-300" />

              <span className="text-lg font-semibold text-white">Logout</span>
            </button>
            <button
              onClick={deleteAccount}
              className="w-full cursor-pointer backdrop-blur-lg bg-red-500/20 border border-red-400/30 rounded-2xl p-6 shadow-2xl transition-all transform hover:scale-105 hover:bg-red-500/30 flex items-center justify-center space-x-3"
            >
              <Delete className="w-6 h-6 text-red-300" />

              <span className="text-lg font-semibold text-white">
                Delete Account
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Email Verification Modal */}
      {showVerification && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Verify Your Email
            </h3>
            <p className="text-purple-200 mb-6">
              Enter the 6-digit code sent to your email address.
            </p>

            <div className="space-y-4">
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                maxLength="6"
                onKeyPress={(e) =>
                  e.key === "Enter" && handleVerificationSubmit(e)
                }
              />
              <p className="text-white-200 mb-6">{message}</p>

              <div className="flex space-x-3">
                <button
                  onClick={handleVerificationSubmit}
                  className="flex-1 cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-medium transition-all transform hover:scale-105"
                >
                  Verify
                </button>
                <button
                  onClick={() => setShowVerification(false)}
                  className="flex-1 cursor-pointer bg-white/10 border border-white/20 hover:bg-white/20 text-white py-3 rounded-xl font-medium transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
