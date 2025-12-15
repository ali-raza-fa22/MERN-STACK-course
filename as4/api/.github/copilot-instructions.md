# AI Coding Agent Instructions

This document provides instructions for AI coding agents to effectively contribute to this project.

## Architecture Overview

This is a TypeScript-based REST API built with Express.js and MongoDB (using Mongoose). The codebase is structured in a modular way, with features like `users`, `blogs`, and `auth` separated into their own directories.

- **`src/index.ts`**: The main entry point of the application. It sets up the Express server, connects to MongoDB, and registers the routes for different modules.
- **`src/users/`**, **`src/blogs/`**, **`src/auth/`**: These directories contain the different modules of the application. Each module has its own controller, model, and schema.
- **`src/lib/`**: This directory contains shared utility functions, such as authentication helpers.

### Data Flow

1. A request comes into `src/index.ts`.
2. The request is routed to the appropriate controller (e.g., `src/users/controller.ts`).
3. The controller uses middleware for authentication and validation.
4. The controller interacts with the Mongoose model (e.g., `src/users/model.ts`) to perform CRUD operations on the database.
5. The controller sends a JSON response back to the client.

## Developer Workflows

### Build

To build the project, run the following command:

```bash
pnpm build
```

This will compile the TypeScript code into JavaScript in the `dist` directory.

### Test

There are no dedicated test scripts in `package.json`. However, the project uses `eslint` and `prettier` for code quality. To run the linter and formatter, use the following commands:

```bash
pnpm format:check
pnpm tsc --noEmit
```

### Debug

To run the application in development mode with hot-reloading, use the following command:

```bash
pnpm dev
```

This will start the server and watch for changes in the `src` directory.

## Project-Specific Conventions and Patterns

### Authentication and Authorization

Authentication is handled using JSON Web Tokens (JWTs). The `src/lib/auth.ts` file contains functions for signing and verifying JWTs.

Authorization is implemented using middleware in `src/users/middleware.ts`. There are three roles defined in `src/lib/auth.ts`: `admin`, `creator`, and `user`.

- **`requireAuth`**: Checks for a valid JWT in the `Authorization` header.
- **`requireUser`**: Ensures that a user is authenticated.
- **`requireAdmin`**: Checks if the authenticated user has the `admin` role.
- **`requireCreator`**: Checks if the authenticated user has the `creator` or `admin` role.

### Validation

The project uses `zod` for schema validation. Validation logic is defined in the `schema.ts` file for each module (e.g., `src/users/schema.ts`). The validation middleware is then used in the controller to validate incoming requests.

### Models

Mongoose is used for interacting with the MongoDB database. Models are defined in the `model.ts` file for each module (e.g., `src/users/model.ts`).

## Integration Points

The application integrates with a MongoDB database. The connection string is configured in `src/index.ts` using the `MONGO_URI` environment variable.

## Key Files and Directories

- **`src/index.ts`**: The main entry point of the application.
- **`src/lib/auth.ts`**: Contains authentication-related utility functions and the `Role` enum.
- **`src/users/middleware.ts`**: Contains authentication and authorization middleware.
- **`src/users/controller.ts`**: An example of a controller that handles RESTful API requests.
- **`src/users/model.ts`**: An example of a Mongoose model.
- **`src/users/schema.ts`**: An example of a `zod` schema for validation.
- **`package.json`**: Contains the project's dependencies and scripts.

see README.md for more details on setup and usage.
