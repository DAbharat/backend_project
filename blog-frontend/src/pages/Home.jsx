import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="min-h-[70vh] flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-2xl w-full text-center py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 drop-shadow">
          Welcome to <span className="text-indigo-600">BlogApp</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Share your thoughts, read amazing stories, and connect with the world. <br />
          <span className="text-indigo-500 font-medium">A modern blogging platform for everyone.</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/blogs"
            className="px-6 py-3 rounded-lg bg-white border border-indigo-600 text-indigo-700 font-semibold shadow hover:bg-indigo-50 transition"
          >
            Explore Blogs
          </Link>
        </div>
      </div>
    </section>
  );
}