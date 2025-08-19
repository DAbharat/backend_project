import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 px-6">
      <div className="max-w-3xl w-full text-center py-20">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Welcome to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            BlogApp
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
          Share your thoughts, read inspiring stories, and{" "}
          <span className="text-indigo-600 font-semibold">connect with the world</span>. <br />
          A <span className="font-medium">modern blogging platform</span> built for everyone.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            🚀 Get Started
          </Link>
          <Link
            to="/blogs"
            className="px-8 py-3 rounded-xl bg-white/90 border border-indigo-300 text-indigo-700 font-semibold shadow hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            📖 Explore Blogs
          </Link>
        </div>
      </div>

      {/* Decorative Footer Note */}
      <footer className="mt-10 text-gray-500 text-sm text-center">
        Crafted with ❤️ for creators & readers
      </footer>
    </section>
  );
}
