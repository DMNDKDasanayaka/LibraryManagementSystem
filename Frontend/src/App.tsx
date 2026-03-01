import React, { useEffect, useState } from 'react';
import { type Book } from './types';
import { BookForm } from './components/BookForm';
import { BookList } from './components/BookList';
import { BookOpen, Library } from 'lucide-react'; // Import icons
import { getBooks, addBook, updateBook, deleteBook } from './api/booksapi';
import './App.css';

   /* 
     STATE MANAGEMENT
   */

const App = () => {
   // Stores all books fetched from backend
  const [books, setBooks] = useState<Book[]>([]);
   // Stores form input values
  const [formData, setFormData] = useState<Book>({ title: '', author: '', description: '' });
   // Stores currently editing book ID (null = not editing)
  const [editingId, setEditingId] = useState<number | null>(null);
  // Loading state while fetching books
  const [loading, setLoading] = useState(true);
  // Error message state
  const [error, setError] = useState<string | null>(null);


   /* 
     FETCH ALL BOOKS FROM API
   */

  const fetchAllBooks = async () => {
    try {
      setLoading(true); // Show loading spinner
      const data = await getBooks();  // Call API
      setBooks(data); // Save books to state
      setError(null); // Clear previous errors
    } catch (err) {
       // If API fails, show error message
      setError('Failed to load books. Is the backend running?'); 
      console.error('Error fetching books', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAllBooks(); }, []);

  /* 
     HANDLE FORM SUBMIT (ADD/UPDATE)
   */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    try {
      // If editingId exists , update book
      if (editingId) await updateBook(editingId, formData);
      else await addBook(formData); // Otherwise add new book
       // Reset form after success
      setFormData({ title: '', author: '', description: '' });
      setEditingId(null);
      // Refresh book list
      fetchAllBooks();
    } catch (err) {
      setError('Failed to save book. Please try again.');
      console.error('Error submitting form', err);
    }
  };

  /* 
     HANDLE DELETE BOOK
   */

  const handleDelete = async (id: number) => {
    // Ask user confirmation
    if (window.confirm('Delete this book?')) {
      try {
        await deleteBook(id); // Call delete API
        fetchAllBooks(); // Refresh list
      } catch (err) {
        setError('Failed to delete book.');
      }
    }
  };

   /* 
     HANDLE EDIT BOOK
   */

  const handleEdit = (book: Book) => {
    setFormData(book); // Fill form with book data
    setEditingId(book.id!); // Set editing 
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top smoothly for better UX
  };

    /* 
     CANCEL EDIT MODE
   */

  const handleCancel = () => {
    setFormData({ title: '', author: '', description: '' }); // Clear form
    setEditingId(null); // Exit editing
  }; 

  return (
      <div className="app-wrapper">

        {/* Full width header */}
        <header className="app-header">
          <h1><BookOpen size={32} /> Library Manager</h1>
          <p>Manage your book collection with ease</p>
        </header>

        {/* Centered main content */}
        <main className="app-container">
          <div className="app-layout">

            {/* Error spans full width */}
            {error && (
              <div className="error-banner">
                <span> {error}</span>
                <button onClick={() => setError(null)}>✕</button>
              </div>
            )}

            {/* LEFT COLUMN — Form */}
            <div>
              {editingId && (
                <div className="edit-banner">
                   Editing book — update fields and click <strong> Update Book</strong>
                </div>
              )}
              <BookForm
                formData={formData}
                setFormData={setFormData}
                editingId={editingId}
                handleSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </div>

            {/* RIGHT COLUMN — Book List */}
            <div>
              <div className="section-title">
                <Library size={18} />
                All Books
                {!loading && <span className="book-count">{books.length}</span>}
              </div>

              {loading ? (
                <div className="loading-wrapper">
                  <div className="spinner" />
                  <p>Loading your books...</p>
                </div>
              ) : (
                <BookList
                  books={books}
                  editBook={handleEdit}
                  deleteBook={handleDelete}
                />
              )}
            </div>

          </div>
        </main>

        {/* Full width footer */}
        <footer className="app-footer">
          📚 Library Management System 
        </footer>

      </div>
  );
};

export default App;