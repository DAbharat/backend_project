import Profile from "../components/User/Profile.jsx";
import EditProfileForm from "../components/User/EditProfileForm.jsx";

export default function ProfilePage() {
  return (
    <section className="max-w-2xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6">Your Profile</h2>
      <Profile />
      <div className="mt-8">
        <EditProfileForm />
      </div>
    </section>
  );
}