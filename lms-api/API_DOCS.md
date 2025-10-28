## 🚀 Overview

This API provides endpoints for managing users, courses, chapters, and authentication in a learning management system. It supports role-based access control with user and admin privileges.

## 🔧 Base Configuration

- **Base URL**: `http://localhost:3001/api`
- **Content-Type**: `application/json`
- **Authentication**: JWT Bearer Token

## 🔐 Authentication

The API uses JWT (JSON Web Token) based authentication with role-based authorization.

### Available Roles

- **user**: Standard user with limited permissions
- **admin**: Administrative user with full system access

### Auth Endpoints

#### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response**: Returns JWT token for subsequent authenticated requests.

#### View Profile

```http
GET /auth/profile
Authorization: Bearer <jwt_token>
```

#### Update Profile

```http
PATCH /auth/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Updated Name"
}
```

## 👥 Admin User Management

Administrative endpoints for managing users (requires admin role).

#### Get All Users

```http
GET /admin/users
Authorization: Bearer <admin_jwt_token>
```

#### Get User by ID

```http
GET /admin/users/{user_id}
Authorization: Bearer <admin_jwt_token>
```

#### Update User

```http
PATCH /admin/users/{user_id}
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "name": "Updated Name"
}
```

#### Delete User

```http
DELETE /admin/users/{user_id}
Authorization: Bearer <admin_jwt_token>
```

## 📚 Course Management

### Get Courses

```http
GET /courses
Authorization: Bearer <jwt_token>
```

### Create Course

```http
POST /courses
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Course Title",
  "description": "Course description",
  "thumbnail": "thumbnail_url",
  "instructor": "instructor_user_id",
  "category": "category_name"
}
```

### Update Course

```http
PUT /courses/{course_id}
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated Course Title",
  "description": "Updated description"
}
```

## 📖 Chapter Management

### Create Chapter

```http
POST /chapters
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Chapter Title",
  "course": "course_id"
}
```

### Get Chapters

```http
GET /chapters
Authorization: Bearer <jwt_token>
```

### Get Chapter Lessons

```http
GET /chapters/{chapter_id}
Authorization: Bearer <jwt_token>
```

## 🛡️ Security \& Authorization

### JWT Token Format

The API uses Bearer token authentication. Include the token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Claims

JWT tokens contain the following claims:

- `sub`: User ID
- `email`: User email
- `role`: User role (user/admin)
- `iat`: Issued at timestamp
- `exp`: Expiration timestamp

### Role-Based Access

- **User endpoints**: Accessible by authenticated users
- **Admin endpoints** (`/admin/*`): Restricted to users with admin role

## 📋 Request/Response Format

### Standard Headers

```
Content-Type: application/json
User-Agent: insomnia/11.3.0
Authorization: Bearer <jwt_token> (for protected routes)
```

### Error Response Format

```json
{
  "error": "Error message",
  "status": "error_code"
}
```

### Success Response Format

```json
{
  "data": { ... },
  "message": "Success message",
  "status": "success"
}
```

## 🔍 Sample User Accounts

The API includes sample test accounts:

### Admin User

- **Email**: `ali@example.com`
- **Password**: `123456`
- **Role**: `admin`

### Regular Users

- **Email**: `zubair@example.com` / **Password**: `123456`
- **Email**: `you@example.com` / **Password**: `123456`

## 🚀 Getting Started

1. **Start the Server**

```bash
npm start
# Server runs on http://localhost:3001
```

2. **Register or Login**

```bash
curl -X POST http://localhost:3001/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"Test User","email":"test@example.com","password":"123456"}'
```

3. **Use JWT Token**

```bash
curl -X GET http://localhost:3001/api/auth/profile \
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📝 Development Notes

- All endpoints expect JSON payloads for POST/PUT/PATCH requests
- JWT tokens have expiration times - check `exp` claim for validity
- Admin routes require specific role authorization
- Course creation requires instructor user ID reference
- Chapter creation requires valid course ID reference

## 🔗 Import into Insomnia

You can import the provided YAML file directly into Insomnia REST Client to test all endpoints with pre-configured requests and authentication tokens.

---

_This API documentation is based on the Insomnia collection export. For the most up-to-date endpoint information, refer to the actual API implementation._

<div align="center">⁂</div>

[^1]: Insomnia_2025-10-28.yaml
