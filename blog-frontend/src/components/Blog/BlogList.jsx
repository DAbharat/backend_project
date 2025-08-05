import { useEffect, useState } from "react";
import { getAllBlogs } from "../../api/blog.js";
import { Link } from "react-router-dom";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getAllBlogs().then(res => setBlogs(res.data.data || []));
  }, []);

  if (!blogs.length) return <div className="text-gray-500">No blogs yet.</div>;

  return (
    <ul className="space-y-4">
      {blogs.map(blog => (
        <li key={blog._id} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
          <Link to={`/blogs/${blog._id}`} className="text-xl font-semibold text-indigo-700 hover:underline">
            {blog.title}
          </Link>
          <div className="text-sm text-gray-500 mt-1">by {blog.author?.fullName || "Unknown"}</div>
          <div className="text-xs text-gray-400">{blog.isPublished ? "Published" : "Draft"}</div>
        </li>
      ))}
    </ul>
  );
}