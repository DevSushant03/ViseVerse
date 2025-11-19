import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setauthError] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const { setisLoggedIn } = useContext(AppContext);
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setloading(true);
    const res = await fetch(SERVER_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",

      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!data.success) {
      setloading(false);
      toast.error("Login failed !");
      setauthError(data.message);
    }
    if (data.success) {
      toast.success("Login Successfully");
      setisLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");

      setloading(false);
      setEmail("");
      setPassword("");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] p-6">
      {/* Glass Card */}
      <div className="w-full max-w-md p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent mb-8">
          Welcome Back
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 
          border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/40 
          focus:border-purple-400 transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 
          border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/40 
          focus:border-purple-400 transition"
              required
            />
          </div>

          {/* Error Message */}
          {authError && (
            <p className="text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg text-center py-2 text-sm">
              {authError}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 
        text-white font-semibold shadow-lg hover:opacity-90 active:scale-95 transition"
          >
            {loading ? <Loader /> : "Login"}
          </button>
        </form>

        {/* Links */}
        <div className="mt-8 text-center text-gray-300 text-sm">
          <Link
            to="/register"
            className="block mb-3 text-purple-300 hover:text-purple-200 transition"
          >
            Don’t have an account? Register
          </Link>

          <Link
            to="/forgetpassword"
            className="text-purple-300 hover:text-purple-200 transition"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
