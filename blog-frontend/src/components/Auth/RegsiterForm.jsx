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
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="username" placeholder="Username" onChange={handleChange} required className="input input-bordered w-full" />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="input input-bordered w-full" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="input input-bordered w-full" />
      <input name="fullName" placeholder="Full Name" onChange={handleChange} required className="input input-bordered w-full" />
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">Profile Image</label>
        <input name="profile" type="file" accept="image/*" onChange={handleChange} required className="file-input w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">Cover Image (optional)</label>
        <input name="coverImage" type="file" accept="image/*" onChange={handleChange} className="file-input w-full" />
      </div>
      <button type="submit" className="btn btn-primary w-full">Register</button>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}
    </form>
  );
}