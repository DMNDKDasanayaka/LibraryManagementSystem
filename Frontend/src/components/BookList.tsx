import React from 'react';
import { type Book } from '../types';
import { Trash2, Edit3 } from 'lucide-react';

interface Props {
  books: Book[];
  editBook: (book: Book) => void;
  deleteBook: (id: number) => void;
}

export const BookList: React.FC<Props> = ({ books, editBook, deleteBook }) => (
  <div>
    {books.map(book => (
      <div key={book.id} style={{ borderBottom: '1px solid #ddd', padding: '15px 0', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h4 style={{ margin: '0 0 5px 0', color: '#2c2c2c' }}>Title: {book.title}</h4>
          <p style={{ margin: 0, color: '#2c2c2c' }}>Author: {book.author}</p>
          <small style={{ color: '#2c2c2c' }}>Description:{book.description}</small>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => editBook(book)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'blue' }}><Edit3 /></button>
          <button onClick={() => deleteBook(book.id!)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}><Trash2 /></button>
        </div>
      </div>
    ))}
  </div>
);