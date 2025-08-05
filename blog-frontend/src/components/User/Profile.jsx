import { useEffect, useState } from "react";
import { getProfile } from "../../api/user";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile().then(res => setUser(res.data.data));
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="border p-4 rounded mb-4">
      <h2 className="text-xl font-bold">{user.fullName}</h2>
      <div>Username: {user.username}</div>
      <div>Email: {user.email}</div>
      {user.profile && <img src={user.profile} alt="Profile" className="w-24 h-24 rounded-full my-2" />}
      {user.coverImage && <img src={user.coverImage} alt="Cover" className="w-full h-32 object-cover my-2" />}
    </div>
  );
}