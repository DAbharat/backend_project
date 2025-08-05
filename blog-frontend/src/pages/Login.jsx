import LoginForm from "../components/Auth/LoginForm.jsx";

export default function Login() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Sign in to BlogApp</h2>
        <LoginForm />
        <p className="mt-4 text-center text-gray-500">
          Don't have an account?{" "}
          <a href="/register" className="text-indigo-600 hover:underline">Register</a>
        </p>
      </div>
    </section>
  );
}