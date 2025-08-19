import RegisterForm from "../components/Auth/RegsiterForm";

export default function Register() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-between bg-gradient-to-br from-indigo-200 via-purple-100 to-blue-200 relative">

      {/* Glassmorphism Card */}
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl px-6 py-8 border border-white/40 mt-10 mb-6">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-indigo-700 drop-shadow-sm mb-3">
            Create Your Account
          </h2>
          <p className="text-gray-600 text-sm">
            Join our community and start sharing your stories today ✨
          </p>
        </div>

        {/* Register Form */}
        <RegisterForm />

        {/* Bottom text */}
        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium transition-colors"
          >
            Login
          </a>
        </p>
      </div>

      {/* Footer - OUTSIDE the card */}
      <footer className="w-full text-center text-gray-500 text-xs pb-4">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold">BlogApp</span>. All rights reserved.
      </footer>
    </section>
  );
}

