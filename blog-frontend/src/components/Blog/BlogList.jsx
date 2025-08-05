import { useEffect, useState } from "react";
import { getAllBlogs } from "../../api/blog";
import { Link } from "react-router-dom";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getAllBlogs().then(res => setBlogs(res.data.data || []));
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">All Blogs</h2>
      <ul className="space-y-2">
        {blogs.map(blog => (
          <li key={blog._id} className="border p-2 rounded">
            <Link to={`/blogs/${blog._id}`} className="font-semibold">{blog.title}</Link>
            <div className="text-sm text-gray-500">by {blog.author?.fullName || "Unknown"}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}