import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setauthError] = useState("");

  const navigate = useNavigate();

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch(SERVER_URL + "/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();

    if (data.success) {
      setUsername("");
      setEmail("");
      setPassword("");

      navigate("/login");
    }
    setauthError(data.message);
  };

  return (
    <div className="min-h-screen mt-10 flex items-center justify-center bg-gradient-to-r from-purple-700 via-purple-500 to-indigo-500 p-6">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-xl border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-md">
          Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <p
            className="text-red-500 font-bold text-sm text-center mb-4 rounded-lg py-2 px-4"
            style={{
              background: "rgba(239, 68, 68, 0.2)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
            }}
          >
            {authError}
          </p>

          <button
            type="submit"
            className="w-full py-3 cursor-pointer rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition shadow-lg"
          >
            Register
          </button>
        </form>

        <p className="text-center text-white/70 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-200 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
