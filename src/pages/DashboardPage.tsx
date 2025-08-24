import React from 'react';
import BoardCard from '../components/BoardCard';

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Your Boards</h1>
          <p className="text-gray-600">You have {boards.length} boards</p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <span className="text-xl">+</span>
          Create Board
        </button>
      </div>

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
  );
};

export default DashboardPage;
