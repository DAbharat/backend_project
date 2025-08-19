import { useState } from "react";
import { login } from "../../api/auth.js";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { username, password } = form;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login(form);
      localStorage.setItem("token", res.data.data.accessToken);
      navigate("/blogs");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-400">
      <form
        onSubmit={handleSubmit}
        className="w-full h-full flex flex-col justify-center items-center px-4"
      >
        <div className="w-full max-w-lg bg-white/90 rounded-xl shadow-2xl px-10 py-12 flex flex-col gap-8">
          <div className="text-center mb-2">
            <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow mb-2">
              BlogApp
            </h1>
            <p className="text-gray-500 text-base">
              Welcome back! Please login
            </p>
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              name="username"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={handleChange}
              autoComplete="username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition bg-white"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {error && (
            <div
              className="text-red-600 text-center font-medium bg-red-50 border border-red-200 rounded-lg py-2 animate-shake"
              aria-live="assertive"
            >
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-500 text-white font-semibold shadow hover:opacity-90 active:scale-[0.98] transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" /> Remember me
            </label>
            <Link to="/forgot-password" className="text-indigo-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="text-center mt-2 text-gray-600 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline font-medium">
              Register
            </Link>
          </div>
        </div>
        <footer className="mt-8 text-white/80 text-xs text-center">
          &copy; {new Date().getFullYear()} BlogApp. All rights reserved.
        </footer>
      </form>
    </div>
  );
}