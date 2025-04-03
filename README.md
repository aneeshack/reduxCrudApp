
MERN Stack CRUD Application

Overview

This is a full-stack CRUD (Create, Read, Update, Delete) application built using the MERN (MongoDB, Express, React, Node.js) stack. The application includes user authentication, profile management, and admin controls for managing users.

Features

User Feature:

Signup and Login

Update user profile (name, email, password, etc.)

Admin Features:

View all registered users

Search users

Create new users

Block and unblock users

Technologies Used

Frontend: React.js (with React Router, Context API)

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Authentication: JWT (JSON Web Token)

Styling: Tailwind CSS (optional)

Installation

Prerequisites:

Make sure you have the following installed on your system:

Node.js

MongoDB

Steps to Run the Application

1. Clone the Repository:

git clone https://github.com/aneeshack/reduxCrudApp.git
cd mern-crud-app

2. Install Dependencies:

Backend:

cd backend
npm install

Frontend:

cd ../client
npm install

3. Configure Environment Variables:

Create a .env file in the backend folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

4. Start the Application:

Start the Backend Server:

cd backend
npm start

Start the Frontend Server:

cd ../client
npm run dev

The frontend will run on http://localhost:3002 and the backend on http://localhost:8000.

API Routes

User Routes:

POST /api/register - Register a new user

POST /api/login - Login user

GET /api/fetchUserData - Get user profile (authenticated)

PUT /api/editProfile - Update user profile (authenticated)

Admin Routes:

GET /api/fetchUserAdmin - Get all users

POST /api/addUserAdmin - Create a new user


Future Enhancements

Add role-based authentication

Implement password reset functionality

Enhance UI/UX

License

This project is licensed under the MIT License.

Contributing

Feel free to fork the repo and submit pull requests.

Contact

For any issues, contact https://github.com/aneeshack.

