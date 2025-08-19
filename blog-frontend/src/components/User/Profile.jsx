import { useEffect, useState } from "react";
import { getProfile } from "../../api/user.js";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile().then(res => setUser(res.data.data));
  }, []);

  if (!user) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-lg overflow-hidden mb-6">
      {/* Cover Image */}
      <div className="relative h-40 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
        {user.coverImage ? (
          <img
            src={user.coverImage}
            alt="Cover"
            className="w-full h-40 object-cover"
          />
        ) : (
          <div className="w-full h-40 flex items-center justify-center text-indigo-400 text-lg font-semibold">
            No cover image
          </div>
        )}
        {/* Profile Image on top of cover */}
        <div className="absolute left-6 bottom-[-2.5rem]">
          {user.profile ? (
            <img
              src={user.profile}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-white"
            />
          ) : (
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
              No image
            </div>
          )}
        </div>
      </div>
      {/* User Info */}
      <div className="pt-16 px-6 pb-6 text-center">
        <h2 className="text-2xl font-bold text-indigo-700">{user.fullName}</h2>
        <p className="text-purple-600 font-medium">@{user.username}</p>
        <p className="text-pink-500 mt-2">{user.email}</p>
      </div>
    </div>
  );
}