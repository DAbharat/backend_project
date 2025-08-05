import { logout } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("token");
    navigate("/login");
  };
  return <button onClick={handleLogout} className="btn btn-secondary">Logout</button>;
}