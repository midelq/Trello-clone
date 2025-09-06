import React, { useState, useRef } from 'react';
import type { Card } from '../types';

interface ListCardProps {
  card: Card;
  onEdit: (card: Card) => void;
  onDelete: (cardId: string) => void;
}

const ListCard: React.FC<ListCardProps> = ({ card, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(card.title);
  const [editDescription, setEditDescription] = useState(card.description);
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

  const handleStartEdit = () => {
    setIsEditing(true);
    setIsMenuOpen(false);
  };

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onEdit({
        ...card,
        title: editTitle.trim(),
        description: editDescription.trim()
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(card.title);
    setEditDescription(card.description);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-100 rounded-md p-3 mb-2 cursor-pointer hover:bg-gray-200 transition-colors duration-200">
      <div className="flex justify-between items-start">
        {isEditing ? (
          <div className="flex-1 mr-4">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full mb-2 px-3 py-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter title..."
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
              placeholder="Enter description..."
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={handleCancelEdit}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-3 py-1 text-sm text-white bg-purple-600 rounded-md hover:bg-purple-700"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="font-medium text-gray-900">{card.title}</h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{card.description}</p>
          </div>
        )}
        <div className="relative" ref={menuRef}>
          <button
            onClick={handleMenuClick}
            className="bg-purple-600 text-white p-1 rounded-md hover:bg-purple-700"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg">
              <div className="py-1">
                <button
                  onClick={handleStartEdit}
                  className="block w-full text-left px-4 py-2 text-sm text-white bg-purple-600 hover:bg-purple-700 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="block w-full text-left px-4 py-2 text-sm text-white bg-purple-600 hover:bg-purple-700 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
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
