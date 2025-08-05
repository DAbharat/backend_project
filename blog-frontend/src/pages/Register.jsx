//import RegisterForm from "../components/Auth/RegisterForm.jsx";
import RegisterForm from "../components/Auth/RegsiterForm";

export default function Register() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">Create your account</h2>
        <RegisterForm />
        <p className="mt-4 text-center text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">Login</a>
        </p>
      </div>
    </section>
  );
}