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
        <div className="flex justify-between">
          <div className="flex-1">
            <div className="dashboard-header">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="dashboard-title">Your Boards</h1>
                  <p className="dashboard-subtitle">You have {boards.length} boards</p>
                </div>
              </div>
            </div>

            <div className="dashboard-content">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="flex flex-col items-end space-y-4">
            <button className="create-board-button">
              <span>+</span>
              Create Board
            </button>
            <div className="w-64 p-4 bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg shadow-lg h-fit">
              <h2 className="text-lg font-semibold mb-4 text-white">Crypto Market</h2>
              <CryptoPrices />
              <div className="mt-6 pt-6 border-t border-purple-400">
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
