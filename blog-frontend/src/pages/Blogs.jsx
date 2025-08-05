import BlogList from "../components/Blog/BlogList.jsx";
import BlogForm from "../components/Blog/BlogForm.jsx";

export default function Blogs() {
  return (
    <section className="max-w-3xl mx-auto py-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-2">All Blogs</h2>
        <p className="text-gray-500">Read, create, and manage your blogs.</p>
      </div>
      <div className="mb-10">
        <BlogForm />
      </div>
      <BlogList />
    </section>
  );
}