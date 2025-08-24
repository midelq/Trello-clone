import React from 'react';

interface BoardCardProps {
  title: string;
  updatedAt: string;
  onClick?: () => void;
  onMenuClick?: () => void;
}

const BoardCard: React.FC<BoardCardProps> = ({
  title,
  updatedAt,
  onClick,
  onMenuClick
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMenuClick?.();
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          ⋮
        </button>
      </div>
      <div className="text-sm text-gray-500">
        Updated {updatedAt}
      </div>
    </div>
  );
};

export default BoardCard;
