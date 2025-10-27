## Express API app using Typescript

### Usage:

```bash
pnpm dev
```

## Auth API (register / login)

Create a `.env` file in the project root with these values (example):

```
MONGO_URI=mongodb://localhost:27017/lms-api
JWT_SECRET=your_jwt_secret_here
PORT=3001
```

Endpoints:

- POST /api/auth/register

  - body: { "name": "Your Name", "email": "you@example.com", "password": "secret" }
  - returns: { user: { id, name, email }, token }

- POST /api/auth/login

  - body: { "email": "you@example.com", "password": "secret" }
  - returns: { user: { id, name, email }, token }

- GET /api/auth/profile

## For any route requiring authentication:

    - Copy the token from login response.
    - In Postman → Headers tab:

    	`Authorization: Bearer <paste token here>

`

Postman tips:

- Set Content-Type: application/json
- Use the returned token in Authorization header as: `Bearer <token>` for protected routes
