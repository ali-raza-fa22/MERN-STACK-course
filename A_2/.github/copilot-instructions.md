Use ES modules
Don't repeat same code
use try-catch for async operations
Use try-catch for database connections
Centralize database connection logic
Use Mongoose,
do not native MongoDB driver

see part-a/q4/index.js for example solution

Refactor for scalable code

## MERN Stack Course - Mongoose Operations

### Architecture Overview

- **Part A**: Raw MongoDB operations (collections, aggregations, queries)
- **Part C**: Mongoose ODM (schemas, models, CRUD operations)
- **Domain**: Bookstore with Books, Customers, Orders entities
- **Structure**: Each question in separate `qN/` directory with `index.js`

### Development Workflow

- **Run Questions**: `node qN/index.js` to execute implementations
- **Package Manager**: Use `pnpm` for dependencies (see `pnpm-lock.yaml`)

- im using Windows Powershell

- **Testing**: Direct execution with `console.log` for verification
- **Database**: Centralized connection in `client.js` with graceful shutdown

### Code Patterns

- **Schemas**: Define in separate files, export models (e.g., `q1/index.js`)
- **Validation**: Use Mongoose built-in validators with custom error messages

- **Connection**: Always call `connectToDatabase()` before operations, `mongoose.disconnect()` after

### Key Files

- `client.js`: Database connection logic with event handlers
- `qN/index.js`: Individual question implementations

### Conventions

- ES modules with import/export
- Consistent naming: PascalCase for models, camelCase for fields
- Required fields with validation rules
- Graceful process termination handling
- Console logging for operation results
- try-catch for async operations
- try-catch for database connections
