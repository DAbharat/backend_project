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
    <ul className="space-y-5">
      {blogs.map(blog => (
        <li
          key={blog._id}
          className="bg-white rounded-xl shadow p-5 border border-gray-100 hover:shadow-lg transition"
        >
          <Link
            to={`/blogs/${blog._id}`}
            className="text-2xl font-bold text-indigo-700 hover:underline"
          >
            {blog.title}
          </Link>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-500">
              by {blog.author?.fullName || "Unknown"}
            </span>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                blog.isPublished
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {blog.isPublished ? "Published" : "Draft"}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
