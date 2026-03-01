// Controllers/BooksController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryApi.Data;
using LibraryApi.Models;

namespace LibraryApi.Controllers
{
    [Route("api/[controller]")] // Route becomes: api/books
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly LibraryContext _context;

        public BooksController(LibraryContext context) { _context = context; }

        // GET: api/books
        // Returns a list of all books in the database
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks() => await _context.Books.ToListAsync();

        // POST: api/books
        // Creates a new book in the database
        [HttpPost]
        public async Task<ActionResult<Book>> CreateBook(Book book)
        {

            _context.Books.Add(book); // Add the new book to the database context
            await _context.SaveChangesAsync(); // Save changes to the database
            return CreatedAtAction(nameof(GetBooks), new { id = book.Id }, book);
        }

        // PUT: api/books/{id}
        // Updates an existing book with the given id
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, Book book)
        {
            if (id != book.Id) return BadRequest(); // Ensure the id in the URL matches the id of the book object
            _context.Entry(book).State = EntityState.Modified;  // Mark the entity as modified
            await _context.SaveChangesAsync(); // Save changes to the database
            return NoContent(); //successful update
        }

        // DELETE: api/books/{id}
        // Deletes a book with the given id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id); // Find the book by id
            if (book == null) return NotFound(); // If the book does not exist, return Not Found
            _context.Books.Remove(book); // Remove the book from the database
            await _context.SaveChangesAsync();// Save changes to the database
            return NoContent();
        }
    }
}