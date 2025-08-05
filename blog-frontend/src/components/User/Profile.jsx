import { useEffect, useState } from "react";
import { getProfile } from "../../api/user.js";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile().then(res => setUser(res.data.data));
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-2">{user.fullName}</h2>
      <div className="mb-2 text-gray-600">Username: {user.username}</div>
      <div className="mb-2 text-gray-600">Email: {user.email}</div>
      {user.profile && <img src={user.profile} alt="Profile" className="w-24 h-24 rounded-full my-2 mx-auto" />}
      {user.coverImage && <img src={user.coverImage} alt="Cover" className="w-full h-32 object-cover my-2 rounded" />}
    </div>
  );
}