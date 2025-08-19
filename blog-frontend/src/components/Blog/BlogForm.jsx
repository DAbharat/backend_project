import { useState } from "react";
import { createBlog } from "../../api/blog.js";
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
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 space-y-5 border border-gray-100 hover:shadow-md transition"
    >
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
        <input
          name="title"
          placeholder="Enter blog title"
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Content</label>
        <textarea
          name="content"
          placeholder="Write your blog here..."
          rows="5"
          onChange={handleChange}
          required
          className="textarea textarea-bordered w-full"
        />
      </div>

      <button type="submit" className="btn btn-primary w-full">
        ✍️ Create Blog
      </button>

      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  );
}
