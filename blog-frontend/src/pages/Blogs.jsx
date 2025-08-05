import BlogList from "../components/Blog/BlogList";
import BlogForm from "../components/Blog/BlogForm";
export default function Blogs() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Blogs</h2>
      <BlogForm />
      <BlogList />
    </div>
  );
}