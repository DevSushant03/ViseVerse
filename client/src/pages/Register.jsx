import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import { toast } from "react-toastify";
export default function Register() {
  const [name, setname] = useState("");
  const [surname, setsurname] = useState("");
  const [gender, setgender] = useState("");
  const [location, setlocation] = useState("");
  const [number, setnumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setauthError] = useState("");
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const handleRegister = async (e) => {
    e.preventDefault();
    setloading(true);
    const res = await fetch(SERVER_URL + "/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        surname,
        number,
        gender,
        location,
        email,
        password,
      }),
    });
    const data = await res.json();

    if (!data.success) {
      setloading(false);
      setauthError(data.message);
      toast.error("Registration failed !");
    } else {
      setname("");
      setgender("");
      setsurname("");
      setnumber("");
      setlocation("");
      setEmail("");
      setPassword("");
      toast.success("Register Successfully ");
      setloading(false);
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col md:flex-row">
      {/* Left Branding Section */}
      <div
        className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-600/40 to-indigo-600/40 
      p-12 flex-col justify-center backdrop-blur-xl border-r border-white/10"
      >
        <h1 className="text-5xl font-extrabold text-white leading-tight drop-shadow-xl">
          Create Your Account
        </h1>

        <p className="text-gray-300 text-lg mt-4 max-w-sm">
          Join our platform and access powerful AI tools designed to simplify
          your workflow.
        </p>
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full mt-15 max-w-lg space-y-8">
          <h2 className="text-4xl font-bold text-white text-center">
            Register
          </h2>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Name Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-300 mb-1 block">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="First name"
                  className="w-full px-4 py-3 rounded-xl bg-[#14141c] text-white placeholder-gray-500 border border-white/10 focus:ring-2 focus:ring-purple-500/40 outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-1 block">
                  Surname
                </label>
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setsurname(e.target.value)}
                  placeholder="Last name"
                  className="w-full px-4 py-3 rounded-xl bg-[#14141c] text-white placeholder-gray-500 border border-white/10 focus:ring-2 focus:ring-indigo-500/40 outline-none"
                  required
                />
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Mobile</label>
              <input
                type="text"
                value={number}
                maxLength="10"
                onChange={(e) => setnumber(e.target.value)}
                placeholder="Your phone number"
                className="w-full px-4 py-3 rounded-xl bg-[#14141c] text-white placeholder-gray-500 border border-white/10 focus:ring-2 focus:ring-purple-500/40 outline-none"
                required
              />
            </div>

            {/* Gender & Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-300 mb-1 block">
                  Gender
                </label>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                  placeholder="Male/Female/Other"
                  className="w-full px-4 py-3 rounded-xl bg-[#14141c] text-white placeholder-gray-500 border border-white/10 focus:ring-2 focus:ring-purple-500/40 outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 mb-1 block">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setlocation(e.target.value)}
                  placeholder="City / Area"
                  className="w-full px-4 py-3 rounded-xl bg-[#14141c] text-white placeholder-gray-500 border border-white/10 focus:ring-2 focus:ring-indigo-500/40 outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-xl bg-[#14141c] text-white placeholder-gray-500 border border-white/10 focus:ring-2 focus:ring-purple-500/40 outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full px-4 py-3 rounded-xl bg-[#14141c] text-white placeholder-gray-500 border border-white/10 focus:ring-2 focus:ring-purple-500/40 outline-none"
                required
              />
            </div>

            {/* Error Message */}
            {authError && (
              <p className="text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg text-center py-2 text-sm">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:opacity-90 active:scale-95 transition shadow-lg"
            >
              {loading ? <Loader /> : "Register"}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm">
            Already have an account?
            <Link
              to="/login"
              className="text-purple-300 ml-1 hover:text-purple-200 underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
