# LMS API

An Express API application built with TypeScript for a Learning Management System (LMS).

## Project Setup

1. Clone the repository.
2. Install dependencies using `pnpm install`.
3. Create a `.env` file in the project root with the following variables:

   ```
   MONGO_URI=mongodb://localhost:27017/lms-api
   JWT_SECRET=your_jwt_secret_here
   PORT=3001
   ```

4. Run the development server:

   ```bash
   pnpm dev
   ```

## Authentication

This API uses JWT (JSON Web Tokens) for authentication. Include the token in the `Authorization` header as `Bearer <token>` for protected routes.

### Register/Login

- **POST /api/auth/register**

  - Body: `{ "name": "Your Name", "email": "you@example.com", "password": "secret" }`
  - Returns: `{ user: { id, name, email }, token }`

- **POST /api/auth/login**

  - Body: `{ "email": "you@example.com", "password": "secret" }`
  - Returns: `{ user: { id, name, email }, token }`

- **GET /api/auth/profile**
  - Requires authentication.
  - Returns user profile information.

## Roles and Permissions

| Role      | Permissions                                                                                   |
| --------- | --------------------------------------------------------------------------------------------- |
| **Admin** | Full CRUD on courses, chapters, lessons, and users.                                           |
| **User**  | Register/login, enroll in courses (paid in production), view lessons, mark lessons completed. |

## Workflow

### Admin Flow

1. Login as Admin.
2. Create a Course:
   - **POST /courses**
     - Body: `{ "title": "Course Title", "description": "Description", "thumbnail": "URL", "category": "Category" }`
3. Add Chapters:
   - **POST /courses/:id/chapters**
     - Body: `{ "title": "Chapter Title", "order": 1 }`
4. Add Lessons:
   - **POST /chapters/:id/lessons**
     - Body: `{ "title": "Lesson Title", "description": "Description", "videoLink": "URL", "imageLink": "URL", "duration": 60, "order": 1 }`
5. Edit or Delete:
   - Use **PUT** or **DELETE** for courses, chapters, lessons.
   - Publish/Unpublish Course.

### User Flow

1. Register/Login:
   - **POST /api/auth/register** or **POST /api/auth/login**
2. View Available Courses:
   - **GET /courses** (only published courses)
3. Enroll in a Course:
   - **POST /courses/:id/enroll**
4. Access Chapters & Lessons:
   - **GET /courses/:id**
5. Mark Lesson Completed:
   - **POST /lessons/:id/complete**
6. Track Progress:
   - **GET /users/me/progress/:courseId**

## Using the API in Postman

- Set `Content-Type: application/json` in headers.
- For authenticated requests, add `Authorization: Bearer <token>` in headers.
- Use the token obtained from login/register responses.
