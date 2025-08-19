// import { useEffect, useState } from "react";
// import { getBlogById, deleteBlog, togglePublish } from "../../api/blog.js";
// import { useParams, useNavigate } from "react-router-dom";

// export default function BlogDetail() {
//   const { blogId } = useParams();
//   const [blog, setBlog] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getBlogById(blogId).then(res => setBlog(res.data.data));
//   }, [blogId]);

//   const handleDelete = async () => {
//     await deleteBlog(blogId);
//     navigate("/blogs");
//   };

//   const handleToggle = async () => {
//     await togglePublish(blogId);
//     getBlogById(blogId).then(res => setBlog(res.data.data));
//   };

//   if (!blog) return <div className="text-center py-10">Loading...</div>;

//   return (
//     <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
//       <button
//         onClick={() => navigate("/blogs")}
//         className="text-indigo-600 hover:underline text-sm mb-4"
//       >
//         ← Back to Blogs
//       </button>

//       <h2 className="text-3xl font-bold mb-3">{blog.title}</h2>
//       <div className="text-sm text-gray-500 mb-4">
//         By: {blog.author?.fullName || "Unknown"}
//       </div>

//       <p className="text-gray-700 leading-relaxed mb-6">{blog.content}</p>

//       <div className="mb-6">
//         <span
//           className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
//             blog.isPublished
//               ? "bg-green-100 text-green-700"
//               : "bg-yellow-100 text-yellow-700"
//           }`}
//         >
//           {blog.isPublished ? "Published" : "Draft"}
//         </span>
//       </div>

//       <div className="flex gap-3">
//         <button onClick={handleToggle} className="btn btn-info">
//           {blog.isPublished ? "Unpublish" : "Publish"}
//         </button>
//         <button onClick={handleDelete} className="btn btn-error">
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }
