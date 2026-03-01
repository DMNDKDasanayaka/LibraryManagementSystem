// Data/LibraryContext.cs
using Microsoft.EntityFrameworkCore;
using LibraryApi.Models;

namespace LibraryApi.Data
{
    // DbContext is the bridge between C# code and the SQLite database
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options) { }
        // This tells EF to create a "Books" table mapped to the Book model
        public DbSet<Book> Books { get; set; }
    }
}