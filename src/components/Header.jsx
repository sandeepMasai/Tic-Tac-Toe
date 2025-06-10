import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-100 transition duration-300">
          Tic-Tac-Toe
        </Link>
        <nav>
          <ul className="flex space-x-6">
            {user ? (
              <>
                <li>
                  <span className="text-lg font-medium">Welcome, {user.username}!</span>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-gray-200 transition duration-300">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-gray-200 transition duration-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-gray-200 transition duration-300">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;