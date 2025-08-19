import Profile from "../components/User/Profile.jsx";
import EditProfileForm from "../components/User/EditProfileForm.jsx";

export default function ProfilePage() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-pink-100 px-4 py-10">
      <div className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-8 text-center">Your Profile</h2>
        <Profile />
        <div className="mt-10">
          <EditProfileForm />
        </div>
      </div>
      <footer className="mt-8 text-gray-400 text-xs text-center">
        &copy; {new Date().getFullYear()} BlogApp. All rights reserved.
      </footer>
    </section>
  );
}