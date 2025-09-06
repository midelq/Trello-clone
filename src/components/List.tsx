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
    <div className="bg-white rounded-lg w-80 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{list.title}</h2>
        <span className="text-purple-600 text-sm">
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
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter card title..."
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            className="w-full mb-2 px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Enter description..."
            value={newCardDescription}
            onChange={(e) => setNewCardDescription(e.target.value)}
            className="w-full mb-2 px-3 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={3}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsAddingCard(false)}
              className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCard}
              className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Add
            </button>
          </div>
        </div>
      ) : (
                 <div className="mt-4 w-full flex justify-center">
           <button
             onClick={() => setIsAddingCard(true)}
             className="w-full h-8 bg-white rounded-md flex items-center justify-center gap-2"
           >
             <span className="text-purple-500 text-xl">+</span>
             <span className="text-gray-900">Add a card</span>
           </button>
         </div>
      )}
    </div>
  );
};

export default List;
