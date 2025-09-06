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

  return (

<>
      <Navbar username={user.email} />
      <div className="min-h-screen bg-[#6366F1] p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">{board?.title || 'Board View'}</h1>
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-4 px-2">
          {lists.map((list) => (
            <List
              key={list.id}
              list={list}
              onAddCard={handleAddCard}
              onEditCard={handleEditCard}
              onDeleteCard={handleDeleteCard}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BoardView;
