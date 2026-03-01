import React from 'react';
import { type Book } from '../types';
import { PlusCircle } from 'lucide-react';

interface Props {
  formData: Book;
  setFormData: React.Dispatch<React.SetStateAction<Book>>;
  editingId: number | null;
  handleSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
}

export const BookForm: React.FC<Props> = ({ formData, setFormData, editingId, handleSubmit, onCancel }) => {
  return (
    <>
      {/* Inject responsive CSS styles into the page */}
      <style>{`
        .book-form {
          background: #f4f4f4;
          padding: 24px;
          border-radius: 12px;
          margin-bottom: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.07);
        }

        .book-form h3 {
          margin: 0 0 18px 0;
          font-size: 1.2rem;
          color: #1e3a5f;
        }

        .book-form input,
        .book-form textarea {
          display: block;
          width: 100%;
          padding: 10px 14px;
          margin-bottom: 12px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 14px;
          box-sizing: border-box;        /* Prevents overflow on small screens */
          transition: border-color 0.2s;
        }

        .book-form input:focus,
        .book-form textarea:focus {
          outline: none;
          border-color: #2563eb;         /* Blue highlight on focus */
          box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
        }

        .book-form textarea {
          resize: vertical;              /* Only allow vertical resizing */
          min-height: 80px;
        }

        /* Side by side on larger screens */
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        /* Stack vertically on mobile */
        @media (max-width: 600px) {
          .book-form {
            padding: 16px;
          }

          .form-row {
            grid-template-columns: 1fr;  /* Single column on mobile */
          }

          .form-buttons {
            flex-direction: column;      /* Stack buttons on mobile */
          }

          .form-buttons button {
            width: 100%;                 /* Full width buttons on mobile */
            justify-content: center;
          }
        }

        .form-buttons {
          display: flex;
          gap: 10px;
          margin-top: 4px;
        }

        .btn-primary {
          padding: 10px 20px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
          transition: background 0.2s;
        }

        .btn-primary:hover {
          background: #1d4ed8;           /* Darker blue on hover */
        }

        .btn-cancel {
          padding: 10px 20px;
          background: #6b7280;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: background 0.2s;
        }

        .btn-cancel:hover {
          background: #4b5563;
        }
      `}</style>

      <form onSubmit={handleSubmit} className="book-form">
        <h3>{editingId ? 'Edit Book' : 'Add New Book'}</h3>

        {/* Title and Author side by side on desktop, stacked on mobile */}
        <div className="form-row">
          <input
            placeholder="Title *"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <input
            placeholder="Author *"
            value={formData.author}
            onChange={e => setFormData({ ...formData, author: e.target.value })}
            required
          />
        </div>

        {/* Description full width */}
        <textarea
          placeholder="Description (optional)"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
        />

        {/* Buttons */}
        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            {editingId ? 'Update Book' : 'Add Book'} <PlusCircle size={16} />
          </button>

          {/* Cancel only shown in edit mode */}
          {editingId && onCancel && (
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </>
  );
};