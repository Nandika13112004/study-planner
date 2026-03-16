import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/dashboard" className="text-xl font-bold text-indigo-400">
          StudyPlanner AI
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="text-gray-400 hover:text-white transition">
            Dashboard
          </Link>
          <Link to="/subjects" className="text-gray-400 hover:text-white transition">
            Subjects
          </Link>
          <Link to="/plan" className="text-gray-400 hover:text-white transition">
            Study Plan
          </Link>
          <span className="text-gray-500">|</span>
          <span className="text-gray-400">Hi, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;