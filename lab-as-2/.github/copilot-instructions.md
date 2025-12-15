api is running on http://localhost:3000

## API Endpoints

### Posts

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/api/posts`     | Get all posts           |
| GET    | `/api/posts/:id` | Get a single post by ID |
| POST   | `/api/posts`     | Create a new post       |
| PUT    | `/api/posts/:id` | Update a post           |
| DELETE | `/api/posts/:id` | Delete a post           |

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

## Error Handling

The server returns consistent error responses with friendly messages:

```json
{
  "success": false,
  "message": "error message"
}
```

use singleton for connecting to db.
use native fetch() for api requests.
dont use axios

use tailwind css, use https://context7.com/websites/tailwindcss/llms.txt?tokens=10000

use react-router for routing read this "https://context7.com/remix-run/react-router/llms.txt?tokens=10000"

REdux example:

Quick Start Overview

Step 1: Install Dependencies

npm install @reduxjs/toolkit react-redux

Step 2: Create a Redux Slice (counterSlice.js)

````ts
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
name: 'counter',
initialState: {
value: 0
},
reducers: {
increment: state => {
state.value += 1
},
decrement: state => {
state.value -= 1
}
}
})

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer

Step 3: Configure the Store (app/store.js)

import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
reducer: {
counter: counterReducer
}
})

// Step 4: Provide Store to Your App (main.jsx)

import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'

const root = createRoot(document.getElementById('root'))

root.render(
<React.StrictMode>
<Provider store={store}>
<App />
</Provider>
</React.StrictMode>,
)

// Step 5: Use Redux in Your Component (Counter.jsx)

import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './counterSlice'

export function Counter() {
const count = useSelector(state => state.counter.value)
const dispatch = useDispatch()

return (
<div>
<button onClick={() => dispatch(increment())}>Increment</button>
<span>{count}</span>
<button onClick={() => dispatch(decrement())}>Decrement</button>
</div>
)
}```
````
