import React, { useState, useRef } from 'react';
import type { Card } from '../types';

interface ListCardProps {
  card: Card;
  onEdit: (card: Card) => void;
  onDelete: (cardId: string) => void;
}

const ListCard: React.FC<ListCardProps> = ({ card, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this card?')) {
      onDelete(card.id);
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-2 cursor-pointer hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{card.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{card.description}</p>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            onClick={handleMenuClick}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onEdit(card);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">{card.createdAt}</div>
    </div>
  );
};

export default ListCard;
