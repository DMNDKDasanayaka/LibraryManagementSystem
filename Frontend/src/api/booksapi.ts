import axios from 'axios';
import { type Book } from '../types';

const API_URL = "http://localhost:5080/api/books";

/**
 * GET: Fetch all books from the backend
 * Returns an array of Book objects
 */
export const getBooks = async (): Promise<Book[]> => {
  const res = await axios.get(API_URL); // Send GET request
  return res.data; // Return response data
};

/**
 * POST: Add a new book to the database
 * Accepts a Book object (without id)
 */
export const addBook = async (book: Book) => {
  return await axios.post(API_URL, book); // Send POST request with book data
};

/**
 * PUT: Update an existing book
 * id - book ID to update
 * book - updated book data
 */
export const updateBook = async (id: number, book: Book) => {
  return await axios.put(`${API_URL}/${id}`, { ...book, id });
};

/**
 * DELETE: Remove a book by ID
 * id - book ID to delete
 */
export const deleteBook = async (id: number) => {
  return await axios.delete(`${API_URL}/${id}`);
};