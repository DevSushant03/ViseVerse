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
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#08080c]">
      {/* RIGHT GRADIENT PANEL */}
      <div className="flex-1 order-2 lg:order-1 hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-600/40 to-purple-600/40 backdrop-blur-xl border-r border-white/10">
        <h1 className="text-5xl font-extrabold text-white tracking-wide leading-tight">
          Welcome to <br />
          <span className="bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
            ViseVerse
          </span>
        </h1>
      </div>

      {/* LOGIN CARD */}
      <div className="flex-1 order-1 lg:order-2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Login to your account
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/20 placeholder-gray-400 focus:ring-2 focus:ring-purple-500/40"
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 text-white rounded-xl border border-white/20 placeholder-gray-400 focus:ring-2 focus:ring-purple-500/40"
              required
            />

            {/* Error */}
            {authError && (
              <p className="text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl py-2 text-center">
                {authError}
              </p>
            )}

            {/* Login Button */}
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:opacity-90 active:scale-95 transition">
              {loading ? <Loader /> : "Login"}
            </button>
          </form>

          <div className="mt-8 text-center text-gray-300 text-sm space-y-2">
            <Link
              to="/register"
              className="block text-purple-300 hover:text-purple-200"
            >
              Create a new account
            </Link>
            <Link
              to="/forgetpassword"
              className="block text-purple-300 hover:text-purple-200"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
