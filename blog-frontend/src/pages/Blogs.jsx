import BlogList from "../components/Blog/BlogList.jsx";
import BlogForm from "../components/Blog/BlogForm.jsx";

export default function Blogs() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-indigo-700">📚 Blogs</h2>
        <p className="text-gray-500 mt-2">Read, create, and share your thoughts.</p>
      </div>

      <div className="mb-12">
        <BlogForm />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">All Posts</h3>
        <BlogList />
      </div>
    </section>
  );
}
