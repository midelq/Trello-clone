export interface Board {
  id: string;
  title: string;
  updatedAt: string;
}

export interface Card {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface List {
  id: string;
  title: string;
  cards: Card[];
  boardId: string;
}

export type ListType = 'todo' | 'in-progress' | 'done';
