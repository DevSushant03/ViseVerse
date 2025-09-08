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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 via-purple-500 to-indigo-500 p-6">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-xl border border-white/20">
        <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-md">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
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
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-100"
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
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-100"
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
            className="w-full py-3 rounded-xl cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition shadow-lg"
          >
            {loading ? <Loader /> : "Login"}
          </button>
        </form>

        <p className="flex justify-between text-center text-white/70 text-sm mt-6 max-sm:flex-col">
          <Link
            to="/register"
            className="text-purple-100 cursor-pointer mb-5 hover:underline"
          >
            Don’t have an account? Register
          </Link>
          <Link
            to="/forgetpassword"
            className="text-purple-100 cursor-pointer hover:underline"
          >
            Forget Password
          </Link>
        </p>
      </div>
    </div>
  );
}
