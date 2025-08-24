import React from 'react';
import BoardCard from '../components/BoardCard';
import '../styles/auth.css';

interface Board {
  id: string;
  title: string;
  updatedAt: string;
}

const DashboardPage: React.FC = () => {
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
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="dashboard-title">Your Boards</h1>
            <p className="dashboard-subtitle">You have {boards.length} boards</p>
          </div>
          <button className="create-board-button">
            <span>+</span>
            Create Board
          </button>
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
  );
};

export default DashboardPage;
