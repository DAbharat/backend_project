import { useState } from "react";
import { register } from "../../api/auth.js";

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    profile: null,
    coverImage: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setForm({ ...form, [e.target.name]: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    try {
      await register(data);
      setSuccess("Registration successful! Please login.");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
  <form onSubmit={handleSubmit} className="space-y-4 w-full">
    {/* Two-column grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Username */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Username</label>
        <input
          name="username"
          placeholder="Enter your username"
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-sm"
        />
      </div>

      {/* Full Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Full Name</label>
        <input
          name="fullName"
          placeholder="Enter your full name"
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-sm"
        />
      </div>
    </div>

    {/* Email */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-600">Email</label>
      <input
        name="email"
        type="email"
        placeholder="Enter your email"
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-sm"
      />
    </div>

    {/* Password */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-600">Password</label>
      <input
        name="password"
        type="password"
        placeholder="••••••••"
        onChange={handleChange}
        required
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 outline-none text-sm"
      />
    </div>

    {/* Profile + Cover Images */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Profile Image */}
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">Profile Image</label>
    <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition">
      <span className="text-xs text-gray-500">Click to upload</span>
      <span className="text-sm font-medium text-indigo-600">Profile Image</span>
      <input
        name="profile"
        type="file"
        accept="image/*"
        onChange={handleChange}
        required
        className="hidden"
      />
    </label>
  </div>

  {/* Cover Image */}
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">Cover Image (optional)</label>
    <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition">
      <span className="text-xs text-gray-500">Click to upload</span>
      <span className="text-sm font-medium text-indigo-600">Cover Image</span>
      <input
        name="coverImage"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </label>
  </div>
</div>

    {/* Submit */}
    <button
      type="submit"
      className="mt-4 w-full py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow hover:bg-indigo-700 transition"
    >
      Register
    </button>

    {/* Messages */}
    {error && <div className="text-red-500 text-sm">{error}</div>}
    {success && <div className="text-green-600 text-sm">{success}</div>}
  </form>
);



}