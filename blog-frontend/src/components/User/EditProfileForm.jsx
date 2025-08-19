import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../../api/user.js";

export default function EditProfileForm() {
  const [form, setForm] = useState({ fullName: "", profile: null, coverImage: null });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getProfile().then(res => {
      setForm(f => ({ ...f, fullName: res.data.data.fullName || "" }));
    });
  }, []);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setForm({ ...form, [e.target.name]: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => { if (value) data.append(key, value); });

    try {
      await updateProfile(data);
      setSuccess("✅ Profile updated!");
    } catch (err) {
      setError(err.response?.data?.message || "❌ Update failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl shadow p-8 space-y-8"
    >
      <h3 className="text-2xl font-bold text-indigo-700 mb-4 text-center">Edit Profile</h3>
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-indigo-700">Full Name</label>
        <input
          name="fullName"
          value={form.fullName}
          placeholder="Enter your full name"
          onChange={handleChange}
          required
          className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
        />
      </div>
      {/* Two Column Layout for Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-purple-700">Profile Image</label>
          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition">
            <span className="text-xs text-gray-500">Click to upload</span>
            <span className="text-sm font-medium text-indigo-600">Profile Image</span>
            <input
              name="profile"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-pink-700">Cover Image</label>
          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-pink-300 rounded-lg cursor-pointer hover:border-pink-400 hover:bg-pink-50 transition">
            <span className="text-xs text-gray-500">Click to upload</span>
            <span className="text-sm font-medium text-pink-600">Cover Image</span>
            <input
              name="coverImage"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
      {/* Submit + Feedback */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
      >
        Update Profile
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
      </form>
  );
}