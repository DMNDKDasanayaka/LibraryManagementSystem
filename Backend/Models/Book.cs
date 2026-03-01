// Models/Book.cs
using System.ComponentModel.DataAnnotations;

namespace LibraryApi.Models
{
    // This class represents a Book record in the database
    // Entity Framework will create a "Books" table based on this class
    public class Book
    {
        public int Id { get; set; } // Primary key, auto-incremented
        [Required]
        public string Title { get; set; } = string.Empty;  // Book title
        [Required]
        public string Author { get; set; } = string.Empty;  // Author name
        public string Description { get; set; } = string.Empty; // Short description
    }
}