import { useState } from "react";
import { createBlog } from "../../api/blog";
import { useNavigate } from "react-router-dom";

export default function BlogForm() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createBlog(form);
      navigate("/blogs");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create blog");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <input name="title" placeholder="Title" onChange={handleChange} required className="input input-bordered w-full" />
      <textarea name="content" placeholder="Content" onChange={handleChange} required className="textarea textarea-bordered w-full" />
      <button type="submit" className="btn btn-primary w-full">Create Blog</button>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
}