import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../../api/user.js";

export default function EditProfileForm() {
  const [form, setForm] = useState({
    fullName: "",
    profile: null,
    coverImage: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getProfile().then(res => {
      setForm(f => ({
        ...f,
        fullName: res.data.data.fullName || "",
      }));
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
    setError("");
    setSuccess("");
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    try {
      await updateProfile(data);
      setSuccess("Profile updated!");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-lg shadow p-6">
      <input name="fullName" value={form.fullName} placeholder="Full Name" onChange={handleChange} required className="input input-bordered w-full" />
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">Profile Image</label>
        <input name="profile" type="file" accept="image/*" onChange={handleChange} className="file-input w-full" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">Cover Image</label>
        <input name="coverImage" type="file" accept="image/*" onChange={handleChange} className="file-input w-full" />
      </div>
      <button type="submit" className="btn btn-primary w-full">Update Profile</button>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}
    </form>
  );
}