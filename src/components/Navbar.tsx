import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import BitcoinPrice from './BitcoinPrice';
import FearGreedIndex from './FearGreedIndex';
import '../styles/auth.css';

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <Link to="/dashboard" className="navbar-logo">
            Trello Clone
          </Link>
          <BitcoinPrice />
          <FearGreedIndex />
        </div>
        <div className="navbar-right">
          <div className="user-info">
            <div className="user-avatar">
              <svg viewBox="0 0 24 24" fill="currentColor" height="20" width="20">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <span className="navbar-user">{username}</span>
            <button onClick={handleLogout} className="navbar-logout">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
