# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.19.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

# API Documentation

RESTful API built with Express.js, TypeScript, and MongoDB (Mongoose).

## Base URL

```
http://localhost:3001
```

## Authentication

Most endpoints require authentication via Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

Tokens are obtained from `/auth/register` or `/auth/login` endpoints.

## User Roles

- **admin**: Full access, can update user roles, manage all blogs
- **creator**: Can create and manage their own blogs
- **user**: Can view blogs only

Users with emails listed in `ADMIN_EMAILS` environment variable are automatically assigned the `admin` role upon registration.

---

## Authentication Routes

### Register

**POST** `/auth/register`

Create a new user account.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `201 Created`

```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2025-12-08T10:00:00.000Z",
    "updatedAt": "2025-12-08T10:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**

- `400` - Validation failed
- `409` - Email already in use
- `500` - Server error

---

### Login

**POST** `/auth/login`

Authenticate and receive access token.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`

```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2025-12-08T10:00:00.000Z",
    "updatedAt": "2025-12-08T10:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**

- `400` - Validation failed
- `401` - Invalid credentials
- `500` - Server error

---

## User Routes

### Get All Users

**GET** `/api/users`

Get list of all users.

**Authentication:** Required (Bearer token)

**Response:** `200 OK`

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2025-12-08T10:00:00.000Z",
    "updatedAt": "2025-12-08T10:00:00.000Z"
  }
]
```

**Errors:**

- `401` - Not Authenticated
- `500` - Server error

GET /api/users?name=ali - Finds all users with "ali" in their name
GET /api/users?name=john - Finds all users with "john" in their name

---

### Get User by ID

**GET** `/api/users/:id`

Get a specific user by ID.

**Authentication:** Required (Bearer token)

**URL Parameters:**

- `id` - User MongoDB ObjectId

**Response:** `200 OK`

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "createdAt": "2025-12-08T10:00:00.000Z",
  "updatedAt": "2025-12-08T10:00:00.000Z"
}
```

**Errors:**

- `400` - Invalid user id
- `401` - Not Authenticated
- `404` - User not found
- `500` - Server error

---

### Update User

**PUT** `/api/users/:id`

Update user information.

**Authentication:** Required (Bearer token)

**URL Parameters:**

- `id` - User MongoDB ObjectId

**Request Body:** (all fields optional, at least one required)

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "newpassword123",
  "role": "admin"
}
```

**Permissions:**

- Users can update their own profile (name, email, password)
- Only admins can update user roles
- Admins updating other users can only change the role field

**Response:** `200 OK`

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "role": "admin",
  "createdAt": "2025-12-08T10:00:00.000Z",
  "updatedAt": "2025-12-08T11:00:00.000Z"
}
```

**Errors:**

- `400` - Validation failed or invalid user id
- `401` - Not Authenticated
- `403` - Not allowed (permission denied)
- `404` - User not found
- `500` - Server error

---

### Delete User

**DELETE** `/api/users/:id`

Delete a user account.

**Authentication:** Required (Bearer token, Admin role)

**URL Parameters:**

- `id` - User MongoDB ObjectId

**Response:** `204 No Content`

**Errors:**

- `400` - Invalid user id
- `401` - Not Authenticated
- `403` - Not Authorized (admin role required)
- `404` - User not found
- `500` - Server error

---

## Blog Routes

### Get All Blogs

**GET** `/api/blogs`

Get list of all blogs with optional filtering.

**Authentication:** Required (Bearer token)

**Query Parameters:** (all optional)

- `title` - Filter by title (case-insensitive partial match)
- `content` - Filter by content (case-insensitive partial match)
- `user` - Filter by author name or email (case-insensitive partial match)

**Examples:**

```
GET /api/blogs?title=javascript
GET /api/blogs?user=ali
GET /api/blogs?title=react&user=john&content=tutorial
```

**Response:** `200 OK`

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "My First Blog",
    "content": "This is the content...",
    "author": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2025-12-08T10:00:00.000Z",
    "updatedAt": "2025-12-08T10:00:00.000Z"
  }
]
```

**Errors:**

- `401` - Not Authenticated
- `500` - Server error

---

### Get Blog by ID

**GET** `/api/blogs/:id`

Get a specific blog by ID.

**Authentication:** Required (Bearer token)

**URL Parameters:**

- `id` - Blog MongoDB ObjectId

**Response:** `200 OK`

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "My First Blog",
  "content": "This is the content...",
  "author": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "createdAt": "2025-12-08T10:00:00.000Z",
  "updatedAt": "2025-12-08T10:00:00.000Z"
}
```

**Errors:**

- `400` - Invalid blog id
- `401` - Not Authenticated
- `404` - Blog not found
- `500` - Server error

---

### Create Blog

**POST** `/api/blogs`

Create a new blog post.

**Authentication:** Required (Bearer token, Creator or Admin role)

**Request Body:**

```json
{
  "title": "My First Blog",
  "content": "This is the blog content..."
}
```

**Response:** `201 Created`

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "My First Blog",
  "content": "This is the blog content...",
  "author": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "createdAt": "2025-12-08T10:00:00.000Z",
  "updatedAt": "2025-12-08T10:00:00.000Z"
}
```

**Errors:**

- `400` - Validation failed
- `401` - Not Authenticated
- `403` - Creator or admin role required
- `500` - Server error

---

### Update Blog

**PUT** `/api/blogs/:id`

Update a blog post.

**Authentication:** Required (Bearer token)

**URL Parameters:**

- `id` - Blog MongoDB ObjectId

**Request Body:** (all fields optional, at least one required)

```json
{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

**Permissions:**

- Blog authors can update their own blogs
- Admins can update any blog

**Response:** `200 OK`

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Updated Title",
  "content": "Updated content...",
  "author": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "createdAt": "2025-12-08T10:00:00.000Z",
  "updatedAt": "2025-12-08T11:00:00.000Z"
}
```

**Errors:**

- `400` - Validation failed or invalid blog id
- `401` - Not Authenticated
- `403` - You are not allowed to edit
- `404` - Blog not found
- `500` - Server error

---

### Delete Blog

**DELETE** `/api/blogs/:id`

Delete a blog post.

**Authentication:** Required (Bearer token)

**URL Parameters:**

- `id` - Blog MongoDB ObjectId

**Permissions:**

- Blog authors can delete their own blogs
- Admins can delete any blog

**Response:** `204 No Content`

**Errors:**

- `400` - Invalid blog id
- `401` - Not Authenticated
- `403` - Not allowed
- `404` - Blog not found
- `500` - Server error

---

## Error Responses

All error responses follow this format:

```json
{
  "message": "Error message",
  "error": "Additional error details (optional)"
}
```

For validation errors (400), the response format is:

```json
{
  "errors": [
    {
      "path": "fieldName",
      "message": "Validation error message"
    }
  ]
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `204` - No Content
- `400` - Bad Request (validation error)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

## Environment Variables

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/as4
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h
ADMIN_EMAILS=admin@example.com,owner@site.com
```

- `PORT` - Server port (default: 3001)
- `MONGO_URI` - MongoDB connection string (default: mongodb://localhost:27017/as4)
- `JWT_SECRET` - Secret key for JWT tokens (default: dev-secret)
- `JWT_EXPIRES_IN` - JWT token expiration time (default: 1h)
- `ADMIN_EMAILS` - Comma or semicolon separated list of emails that should be assigned admin role on registration
