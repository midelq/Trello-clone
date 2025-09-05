import React, { useState } from 'react';
import type { List as ListType, Card } from '../types';
import ListCard from './ListCard';

interface ListProps {
  list: ListType;
  onAddCard: (listId: string, card: Omit<Card, 'id' | 'createdAt'>) => void;
  onEditCard: (listId: string, card: Card) => void;
  onDeleteCard: (listId: string, cardId: string) => void;
}

const List: React.FC<ListProps> = ({ list, onAddCard, onEditCard, onDeleteCard }) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      onAddCard(list.id, {
        title: newCardTitle.trim(),
        description: newCardDescription.trim(),
      });
      setNewCardTitle('');
      setNewCardDescription('');
      setIsAddingCard(false);
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4 w-80">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{list.title}</h2>
        <span className="bg-gray-200 px-2 py-1 rounded text-sm text-gray-600">
          {list.cards.length}
        </span>
      </div>

      <div className="space-y-2">
        {list.cards.map((card) => (
          <ListCard
            key={card.id}
            card={card}
            onEdit={(editedCard) => onEditCard(list.id, editedCard)}
            onDelete={(cardId) => onDeleteCard(list.id, cardId)}
          />
        ))}
      </div>

      {isAddingCard ? (
        <div className="mt-4 bg-white rounded-lg p-3 shadow">
          <input
            type="text"
            placeholder="Enter card title..."
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Enter description..."
            value={newCardDescription}
            onChange={(e) => setNewCardDescription(e.target.value)}
            className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsAddingCard(false)}
              className="px-3 py-1 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCard}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingCard(true)}
          className="mt-4 w-full py-2 text-gray-600 hover:text-gray-900 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 4v16m8-8H4"></path>
          </svg>
          Add a card
        </button>
      )}
    </div>
  );
};

export default List;
