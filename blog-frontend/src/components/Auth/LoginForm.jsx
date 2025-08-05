import { useState } from "react";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(form);
      localStorage.setItem("token", res.data.data.accessToken);
      navigate("/blogs");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="username" placeholder="Username" onChange={handleChange} required className="input input-bordered w-full" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="input input-bordered w-full" />
      <button type="submit" className="btn btn-primary w-full">Login</button>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
}