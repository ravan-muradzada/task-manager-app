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

* **POST** `<span>/api/auth/signup</span>` - Register a new user
* **POST** `<span>/api/auth/login</span>` - Login and receive JWT token
* **POST** `<span>/api/auth/logout</span>` - Logout user (remove token from frontend)

### User Management

* **GET** `<span>/api/users</span>` - Get all users (Admin only)
* **GET** `<span>/api/users/:id</span>` - Get a specific user
* **PUT** `<span>/api/users/:id</span>` - Update user details
* **DELETE** `<span>/api/users/:id</span>` - Delete a user

## Middleware

* `<span>authMiddleware.js</span>` - Protects routes using JWT authentication

## Logging Out (Frontend / Postman)

To log out, remove the stored token from local storage (frontend) or environment variables (Postman):

```
pm.environment.unset('authToken');
```
