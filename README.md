# Backend Project

## Description

This is a backend application built using Node.js, Express, and MongoDB. It includes user authentication using JWT and follows best practices for API development.

## Features

* User authentication (Sign up, Login, Logout)
* JWT-based authentication with expiration
* Secure password hashing
* CRUD operations for users and other resources

## Technologies Used

* Node.js
* Express.js
* MongoDB & Mongoose
* JSON Web Token (JWT)
* bcrypt.js (for password hashing)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   * Create a `<span>.env</span>` file in the root directory
   * Add the following variables:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```

## Usage

1. Start the server:
   ```
   npm start
   ```
2. Use Postman or any API testing tool to test the endpoints.

## API Endpoints

### Authentication

* **POST** `/api/auth/signup` - Register a new user
* **POST** `/api/auth/login` - Login and receive JWT token
* **POST** `/api/auth/logout` - Logout user (remove token from frontend)

### User Management

* **GET** `/api/users` - Get all users (Admin only)
* **GET** `/api/users/:id` - Get a specific user
* **PUT** `/api/users/:id` - Update user details
* **DELETE** `/api/users/:id` - Delete a user

## Middleware

* `authMiddleware.js` - Protects routes using JWT authentication

## Logging Out (Frontend / Postman)

To log out, remove the stored token from local storage (frontend) or environment variables (Postman):

```
pm.environment.unset('authToken');
```
