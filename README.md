# Click Fit - Modular Structure

A dynamic and responsive fitness and sports website with image upload functionality, daily facts, and a modular codebase structure.

## Features

- Responsive UI with Bootstrap
- Animations and interactive elements
- Daily fact from Numbers API
- Image drag-and-drop upload functionality
- MySQL database with users table
- Modular project structure

## Tech Stack

- Frontend: HTML5, CSS3, JavaScript, Bootstrap 5, jQuery
- Backend: Node.js with Express
- Database: MySQL with stored procedures

## Project Structure

```
click-fit-v1/
├── src/
│   ├── index.js                # Main application entry point
│   ├── backend/
│   │   ├── config/             # Configuration files
│   │   │   ├── database.js     # Database configuration
│   │   │   └── server.js       # Server configuration
│   │   ├── controllers/        # Request handlers
│   │   │   └── uploadController.js
│   │   ├── middleware/         # Middleware functions
│   │   │   └── uploadMiddleware.js
│   │   ├── models/             # Database models
│   │   │   └── userModel.js
│   │   └── routes/             # API routes
│   │       └── api.js
│   └── frontend/
│       ├── public/             # Static assets
│       │   ├── css/
│       │   ├── js/
│       │   ├── images/
│       │   └── uploads/        # User-uploaded files
│       └── views/              # HTML templates
│           └── index.html
├── database.sql                # Database setup script
├── package.json
└── .env                        # Environment variables (not tracked by git)
```

## Prerequisites

- Node.js installed
- MySQL installed and running

## Project Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory (use `.env.example` as a template)
4. Set up the database:
   - Log into MySQL
   - Run the SQL commands from `database.sql`:
     ```
     mysql -h 127.0.0.1 -u root < database.sql
     ```

## Running the Application

1. Start the server:
   ```
   npm start
   ```
   or for development with auto-reload:
   ```
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Endpoints

- `POST /api/upload` - Upload an image file
- `GET /api/users` - Get all users
- `POST /api/users` - Add a new user

## Functionality

- **Responsive Design**: The website is fully responsive and works on all devices
- **Animations**: Various animations enhance the user experience
- **Daily Facts**: AJAX call to Numbers API to display interesting facts
- **Image Upload**: Users can drag and drop or click to upload images
- **Database**: Users table with a stored procedure for adding new users 

## Things to improve 
- Use a framework for frontend ReactJS/NestJS (which will allow us to build more modular frontend code like i.e... molecule/atom structure)
- Use utility based style lib/framework for styling
- Use ORM for database interaction
- Use Bucket storage for file uploads