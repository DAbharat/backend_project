import { useEffect, useState } from "react";
import { getBlogById, deleteBlog, togglePublish } from "../api/blog.js";
import { useParams, useNavigate } from "react-router-dom";

export default function BlogDetail() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getBlogById(blogId).then(res => setBlog(res.data.data));
  }, [blogId]);

  const handleDelete = async () => {
    await deleteBlog(blogId);
    navigate("/blogs");
  };

  const handleToggle = async () => {
    await togglePublish(blogId);
    getBlogById(blogId).then(res => setBlog(res.data.data));
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
      <div className="mb-4 text-gray-700">{blog.content}</div>
      <div className="text-sm text-gray-500 mb-2">By: {blog.author?.fullName}</div>
      <div className="mb-4">
        <span className={`inline-block px-2 py-1 rounded text-xs ${blog.isPublished ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
          {blog.isPublished ? "Published" : "Draft"}
        </span>
      </div>
      <div className="flex gap-2">
        <button onClick={handleToggle} className="btn btn-sm btn-info">
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>
        <button onClick={handleDelete} className="btn btn-sm btn-error">Delete</button>
      </div>
    </div>
  );
}