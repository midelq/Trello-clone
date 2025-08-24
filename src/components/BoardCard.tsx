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
      className="board-card"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="board-title">{title}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMenuClick?.();
          }}
          className="board-menu-button"
        >
          ⋮
        </button>
      </div>
      <div className="board-updated">
        Updated {updatedAt}
      </div>
    </div>
  );
};

export default BoardCard;
