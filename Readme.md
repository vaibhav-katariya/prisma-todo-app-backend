# Prisma Todo App

This is a simple Todo application built with Node.js, Express, Prisma, and PostgreSQL. It includes user authentication and CRUD operations for users.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:

  ```sh
  git clone https://github.com/vaibhav-katariya/prisma-todo-app-backend.git
  ```

2. Navigate to the project directory:

  ```sh
  cd prisma-todo-app-backend
  ```

3. Install the dependencies:

  ```sh
  npm install
  ```

4. Set up environment variables:

  ```sh
  DATABASE_URL=your_postgresql_database_url
  JWT_SECRET=your_jwt_secret
  PORT=8000
  ```

5. Run database migrations:

  ```sh
  npx prisma migrate dev
  ```

6. Start the application:

  ```sh
  npm start
  ```

### API Endpoints

#### User Authentication

- **Create a new user**

  **Endpoint:** `POST /api/user/sign-up`

  **Request Body:**

  ```json
  {
    "name": "user_name",
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

- **Login a user**

  **Endpoint:** `POST /api/user/sign-in`

  **Request Body:**

  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

  **Response:**

  ```json
  {
    "message": "Login successful"
  }
  ```

- **Logout a user**

  **Endpoint:** `GET /api/user/sign-out`

  **Response:**

  ```json
  {
    "message": "Logout successful"
  }
  ```

- **Get the current user**

  **Endpoint:** `GET /api/user/me`

  **Headers:**

  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```

  **Response:**

  ```json
  {
    "id": "user_id",
    "name": "user_name",
    "email": "user_email"
  }
  ```

- **Update the current user**

  **Endpoint:** `PUT /api/user/update-user`

  **Headers:**

  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```

  **Request Body:**

  ```json
  {
    "email": "newemail@example.com",
    "name": "new_user_name"
  }
  ```

  **Response:**

  ```json
  {
    "id": "user_id",
    "name": "user_name",
    "email": "user_email"
  }
  ```

- **Delete the current user**

  **Endpoint:** `DELETE /api/user/delete-user`

  **Headers:**

  ```json
  {
    "Authorization": "Bearer jwt_token"
  }
  ```

  **Response:**

  ```json
  {
    "message": "User deleted successfully"
  }
  ```

#### Post Management

- **Create a new post**

  **Endpoint:** `POST /api/post/create-post`

  **Request Body:**

  ```json
  {
    "title": "post_title",
    "content": "post_content"
  }
  ```

  **Response:**

  ```json
  {
    "id": "post_id",
    "title": "post_title",
    "content": "post_content",
    "authorId": "user_id"
  }
  ```

- **Get all posts**

  **Endpoint:** `GET /api/post/get-posts`

  **Response:**

  ```json
  [
    {
    "id": "post_id",
    "title": "post_title",
    "content": "post_content",
    "author": {
      "id": "user_id",
      "name": "user_name"
    }
    }
  ]
  ```

- **Get a post by ID**

  **Endpoint:** `GET /api/post/get-postBy-id/:id`

  **Response:**

  ```json
  {
    "id": "post_id",
    "title": "post_title",
    "content": "post_content",
    "author": {
    "id": "user_id",
    "name": "user_name"
    }
  }
  ```

- **Update a post**

  **Endpoint:** `PUT /api/post/update-post/:id`

  **Request Body:**

  ```json
  {
    "title": "new_post_title",
    "content": "new_post_content"
  }
  ```

  **Response:**

  ```json
  {
    "id": "post_id",
    "title": "new_post_title",
    "content": "new_post_content"
  }
  ```

- **Delete a post**

  **Endpoint:** `DELETE /api/post/delete-post/:id`

  **Response:**

  ```json
  {
    "message": "Post deleted successfully"
  }
  ```