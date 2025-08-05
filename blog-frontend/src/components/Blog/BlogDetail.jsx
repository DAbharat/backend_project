import { useEffect, useState } from "react";
import { getBlogById, deleteBlog, togglePublish } from "../../api/blog";
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
    <div className="border p-4 rounded my-4">
      <h2 className="text-xl font-bold">{blog.title}</h2>
      <div className="mb-2">{blog.content}</div>
      <div className="text-sm text-gray-500">By: {blog.author?.fullName}</div>
      <div>Status: {blog.isPublished ? "Published" : "Draft"}</div>
      <button onClick={handleToggle} className="btn btn-sm btn-info mr-2">
        {blog.isPublished ? "Unpublish" : "Publish"}
      </button>
      <button onClick={handleDelete} className="btn btn-sm btn-error">Delete</button>
    </div>
  );
}