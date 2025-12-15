# Server - Blog API

A TypeScript-based REST API server built with Express and MongoDB for managing blog posts and categories.

## Features

- 🚀 Express.js server with TypeScript support
- 📦 MongoDB integration with Mongoose
- ✅ CRUD operations for Posts and Categories
- 🛡️ Request validation middleware
- 🚨 Global error handling with friendly messages
- 📝 Logger middleware for request tracking
- 🔐 CORS support
- 📋 Type-safe with TypeScript interfaces

## Installation

### Prerequisites

- Node.js 18+
- MongoDB (local or remote)
- pnpm (recommended) or npm

### Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create a `.env` file in the server directory:

```env
MONGODB_URI=mongodb://localhost:27017
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

## Running the Server

### Development Mode

Watch for changes and auto-reload:

```bash
pnpm dev
```

### Type Checking

Check for TypeScript errors:

```bash
pnpm check-types
```

### Build

Compile TypeScript to JavaScript:

```bash
pnpm build
```

### Production

Run the compiled server:

```bash
pnpm start
```

## API Endpoints

### Posts

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/api/posts`     | Get all posts           |
| GET    | `/api/posts/:id` | Get a single post by ID |
| POST   | `/api/posts`     | Create a new post       |
| PUT    | `/api/posts/:id` | Update a post           |
| DELETE | `/api/posts/:id` | Delete a post           |

### Health Check

| Method | Endpoint | Description         |
| ------ | -------- | ------------------- |
| GET    | `/`      | Server health check |

## Request/Response Examples

### Create Post

```bash
POST /api/posts
Content-Type: application/json

{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post",
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "My First Blog Post",
    "content": "This is the content of my blog post"
  }
}
```

## Project Structure

```
server/
├── src/
│   ├── middleware/
│   │   ├── errorHandler.ts      # Global error handling
│   │   └── validation.ts        # Request validation
│   ├── models/
│   │   ├── Post.ts              # Post model
│   ├── routes/
│   │   └── posts.ts             # API routes
│   └── index.ts                 # Server entry point
├── dist/                        # Compiled JavaScript (after build)
├── package.json
├── tsconfig.json
└── README.md
```

## Error Handling

The server returns consistent error responses with friendly messages:

```json
{
  "success": false,
  "message": "error message"
}
```

Common HTTP status codes:

- `200` - OK
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `409` - Conflict (duplicate entry)
- `500` - Internal Server Error
