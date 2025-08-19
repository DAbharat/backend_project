import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <nav className="bg-gray-800 p-4 flex gap-4 text-white">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/register" className="hover:underline">Register</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/blogs" className="hover:underline">Blogs</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
      </nav>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:blogId" element={<BlogDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      
    </Router>
  );
}