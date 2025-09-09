import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import type { Board, List as ListType, Card } from '../types';
import List from '../components/List';
import Navbar from '../components/Navbar';
import { useUser } from '../contexts/UserContext';

const BoardView: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/" />;
  }
  const { boardId } = useParams<{ boardId: string }>();
  const [lists, setLists] = useState<ListType[]>([]);
  const [board, setBoard] = useState<Board | null>(null);
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');

  useEffect(() => {
    
    setBoard({
      id: boardId || '',
      title: 'Sample Board',
      updatedAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    });
    
    const defaultLists: ListType[] = [
      {
        id: '1',
        title: 'To Do',
        cards: [],
        boardId: boardId || '',
      },
      {
        id: '2',
        title: 'In Progress',
        cards: [],
        boardId: boardId || '',
      },
      {
        id: '3',
        title: 'Done',
        cards: [],
        boardId: boardId || '',
      },
    ];
    setLists(defaultLists);
  }, [boardId]);

  const handleAddCard = (listId: string, cardData: Omit<Card, 'id' | 'createdAt'>) => {
    const newCard: Card = {
      id: Date.now().toString(),
      ...cardData,
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };

    setLists(lists.map(list =>
      list.id === listId
        ? { ...list, cards: [...list.cards, newCard] }
        : list
    ));
  };

  const handleEditCard = (listId: string, editedCard: Card) => {
    setLists(lists.map(list =>
      list.id === listId
        ? {
            ...list,
            cards: list.cards.map(card =>
              card.id === editedCard.id ? editedCard : card
            ),
          }
        : list
    ));
  };

  const handleDeleteCard = (listId: string, cardId: string) => {
    setLists(lists.map(list =>
      list.id === listId
        ? { ...list, cards: list.cards.filter(card => card.id !== cardId) }
        : list
    ));
  };

  const handleAddList = () => {
    if (newListTitle.trim()) {
      const newList: ListType = {
        id: Date.now().toString(),
        title: newListTitle.trim(),
        cards: [],
        boardId: boardId || '',
      };
      setLists([...lists, newList]);
      setNewListTitle('');
      setIsAddingList(false);
    }
  };

  const handleEditListTitle = (listId: string, newTitle: string) => {
    setLists(lists.map(list =>
      list.id === listId
        ? { ...list, title: newTitle.trim() }
        : list
    ));
  };

  const handleDeleteList = (listId: string) => {
    if (window.confirm('Ви впевнені, що хочете видалити цей список? Усі картки в ньому також будуть видалені.')) {
      setLists(lists.filter(list => list.id !== listId));
    }
  };

  return (

<>
      <Navbar username={user.email} />
      <div className="min-h-screen min-w-full bg-[#6366F1] p-6" style={{ minWidth: 'fit-content' }}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">{board?.title || 'Board View'}</h1>
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-4 px-2" style={{ minWidth: 'max-content', position: 'relative' }}>
          {lists.map((list) => (
            <List
              key={list.id}
              list={list}
              onAddCard={handleAddCard}
              onEditCard={handleEditCard}
              onDeleteCard={handleDeleteCard}
              onEditTitle={handleEditListTitle}
              onDeleteList={handleDeleteList}
            />
          ))}
          
          {isAddingList ? (
            <div className="bg-white rounded-lg w-80 p-4 flex-shrink-0">
              <input
                type="text"
                placeholder="Введіть назву списку..."
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                className="w-full mb-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-gray-900 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsAddingList(false)}
                  className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Скасувати
                </button>
                <button
                  onClick={handleAddList}
                  className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Додати
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingList(true)}
              className="bg-white/20 hover:bg-white/30 rounded-lg w-80 p-4 flex items-center justify-center text-white flex-shrink-0 border border-white/30"
            >
              <span className="text-2xl mr-2">+</span>
              Додати новий список
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default BoardView;
