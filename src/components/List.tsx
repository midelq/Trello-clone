import React, { useState } from 'react';
import type { List as ListType, Card } from '../types';
import ListCard from './ListCard';

interface ListProps {
  list: ListType;
  onAddCard: (listId: string, card: Omit<Card, 'id' | 'createdAt'>) => void;
  onEditCard: (listId: string, card: Card) => void;
  onDeleteCard: (listId: string, cardId: string) => void;
  onEditTitle: (listId: string, newTitle: string) => void;
}

const List: React.FC<ListProps> = ({ list, onAddCard, onEditCard, onDeleteCard, onEditTitle }) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(list.title);

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
        {isEditingTitle ? (
          <div className="flex-1 mr-2">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={() => {
                if (editedTitle.trim() && editedTitle !== list.title) {
                  onEditTitle(list.id, editedTitle);
                }
                setIsEditingTitle(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (editedTitle.trim() && editedTitle !== list.title) {
                    onEditTitle(list.id, editedTitle);
                  }
                  setIsEditingTitle(false);
                }
                if (e.key === 'Escape') {
                  setEditedTitle(list.title);
                  setIsEditingTitle(false);
                }
              }}
              className="w-full px-4 py-2 text-lg font-semibold bg-white border border-gray-200 rounded-md text-gray-900 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
              autoFocus
            />
          </div>
        ) : (
          <h2 
            className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-purple-600"
            onClick={() => setIsEditingTitle(true)}
          >
            {list.title}
          </h2>
        )}
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
            placeholder="Назва картки"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            className="w-full mb-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-gray-900 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
          />
          <textarea
            placeholder="Опис картки"
            value={newCardDescription}
            onChange={(e) => setNewCardDescription(e.target.value)}
            className="w-full mb-3 px-4 py-2 bg-white border border-gray-200 rounded-md text-gray-900 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none resize-none"
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
