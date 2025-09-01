import React from 'react';
import { Navigate } from 'react-router-dom';
import BoardCard from '../components/BoardCard';
import CryptoPrices from '../components/CryptoPrices';
import FearGreedIndex from '../components/FearGreedIndex';
import Navbar from '../components/Navbar';
import { useUser } from '../contexts/UserContext';
import '../styles/auth.css';

interface Board {
  id: string;
  title: string;
  updatedAt: string;
}

const DashboardPage: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/" />;
  }
  // Mock data for now - later this will come from your backend
  const boards: Board[] = [
    {
      id: '1',
      title: 'Website Redesign',
      updatedAt: 'Jan 20, 2024'
    },
    {
      id: '2',
      title: 'Mobile App Development',
      updatedAt: 'Jan 22, 2024'
    }
  ];

  return (
    <>
      <Navbar username={user.email} />
      <div className="dashboard-container">
        <div className="dashboard-layout">
          <div className="dashboard-main">
            <div className="dashboard-header">
              <div className="dashboard-header-content">
                <div>
                  <h1 className="dashboard-title">Your Boards</h1>
                  <p className="dashboard-subtitle">You have {boards.length} boards</p>
                </div>
                <button className="create-board-button mobile-full-width">
                  <svg viewBox="0 0 24 24" fill="currentColor" height="20" width="20">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                  Create Board
                </button>
              </div>
            </div>

            <div className="dashboard-content">
              <div className="boards-grid">
                {boards.map((board) => (
                  <BoardCard
                    key={board.id}
                    title={board.title}
                    updatedAt={board.updatedAt}
                    onClick={() => console.log(`Navigate to board ${board.id}`)}
                    onMenuClick={() => console.log(`Open menu for board ${board.id}`)}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="dashboard-sidebar">
            <div className="crypto-widget">
              <h2 className="crypto-widget-title">Crypto Market</h2>
              <CryptoPrices />
              <div className="crypto-widget-divider">
                <FearGreedIndex />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
