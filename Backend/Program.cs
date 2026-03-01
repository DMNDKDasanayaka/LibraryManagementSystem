// Program.cs - Application entry point and configuration
using LibraryApi.Data;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.SwaggerUI;

var builder = WebApplication.CreateBuilder(args);

// Add Services
builder.Services.AddControllers(); // Add controllers (handles routing to Controller classes)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// SQLite Setup
builder.Services.AddDbContext<LibraryContext>(options =>
    options.UseSqlite("Data Source=library.db")); // library.db is the SQLite file

// // Allow React frontend to call this API (Enable CORS)
builder.Services.AddCors(options => {
    options.AddPolicy("AllowReact", p => p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReact"); // Apply CORS before routing
app.UseAuthorization();
app.MapControllers();

// Auto-create the database on startup if it doesn't exist
using (var scope = app.Services.CreateScope()) {
    var db = scope.ServiceProvider.GetRequiredService<LibraryContext>();
    db.Database.EnsureCreated();// Creates library.db automatically
}

app.Run();