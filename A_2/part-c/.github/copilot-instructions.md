Use esmodules
dont repeat same code

refactor
scalable code

## MERN Stack Course - Mongoose Operations

### Architecture Overview

- **Modular Structure**: Each question (q1-q17) in separate directory with `index.js`
- **Shared Database Client**: `client.js` exports `connectToDatabase()` function for MongoDB connection
- **Model Reuse**: Schemas defined in early questions (q1-q3), models exported and imported across questions
- **ES Modules**: All imports/exports use ES module syntax (`import`/`export`)

### Development Workflow

- **Run Questions**: `node qN/index.js` to execute individual question implementations
- **Package Manager**: Use `pnpm` for dependencies (see `pnpm-lock.yaml`)
- **Environment**: Configure `MONGODB_URI` in `.env` (local MongoDB at `mongodb://localhost:27017`)
- **Testing**: Run operations directly - console.log results for verification

### File Structure Examples

```
q7/index.js    # Insert customer - imports Customer from q2
q9/index.js    # Create order - imports Order from q3, uses actual ObjectId strings
q10/index.js   # Populate customer - imports Order from q3
q16/index.js   # Query books > $40 - imports Book from q1
```
