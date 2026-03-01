// src/types/Book.ts


// For creating/updating - id is optional since new books don't have one yet
export interface Book {
  id?: number;
  title: string;
  author: string;
  description: string;
}