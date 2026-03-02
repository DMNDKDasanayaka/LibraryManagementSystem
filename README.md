📚 Library Management System
A full-stack web application for managing a library's book collection. Built with React + TypeScript on the frontend and C# .NET Web API with SQLite on the backend.

🗂️ Project Structure
LibraryManagementSystem/
├── Backend/                        # C# .NET Web API
│   ├── Controllers/
│   │   └── BooksController.cs      # API endpoints (CRUD)
│   ├── Data/
│   │   └── LibraryContext.cs       # Entity Framework DB context
│   ├── Models/
│   │   └── Book.cs                 # Book data model
│   ├── Program.cs                  # App configuration & startup
│   ├── Backend.csproj
│   └── library.db                  # SQLite database (auto-created)
│
└── frontend/                       # React + TypeScript
    ├── src/
    │   ├── api/
    │   │   └── booksapi.ts         # All API call functions
    │   ├── components/
    │   │   ├── BookForm.tsx        # Add / Edit book form
    │   │   └── BookList.tsx        #  book list
    │   ├── types/
    │   │   └── index.ts            # TypeScript interfaces
    │   └── App.tsx                 # Root component
    ├── package.json
    └── vite.config.ts

## 🚀 Getting Started

### Run the Backend
cd Backend
dotnet run

### Run the Frontend
cd frontend
npm install
npm run dev


## 🗄️ Database

The project uses **SQLite** with **Entity Framework Core** (Code First approach).

- The database file `library.db` is automatically created in the `Backend/` folder when the app first runs.
- No database installation or configuration is required.
- The `Books` table is generated from the `Book.cs` model class automatically.

##  Architecture

This project follows the **MVC (Model-View-Controller)** pattern:
-----------------------------------------------------------------------------------
| MVC Layer      | Implementation                                                 |
|----------------|----------------------------------------------------------------|
| **Model**      | `Book.cs` — defines the data structure                         |
| **View**       | React frontend — renders the UI                                |
| **Controller** | `BooksController.cs` — handles HTTP requests and business logic|
-----------------------------------------------------------------------------------