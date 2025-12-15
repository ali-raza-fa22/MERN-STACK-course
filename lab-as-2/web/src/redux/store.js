import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { postsReducer } from "./reducers";

/// <summary>
/// Redux Store Configuration
/// - Combines all reducers
/// - Applies thunk middleware for async actions
/// - Integrates Redux DevTools for state visualization
/// - Exposes store and dispatch for React components
/// </summary>

/// <summary>Root reducer combining all feature reducers</summary>
const rootReducer = combineReducers({
  posts: postsReducer,
  /// Add more reducers here as app grows
});

/// <summary>
/// Thunk middleware configuration
/// Allows dispatching functions (thunks) that can access dispatch and getState
/// Example: dispatch(fetchPosts()) - function that returns another function
/// </summary>
const middleware = [thunk];

/// <summary>
/// Store creation with DevTools support
/// composeWithDevTools enhances Redux with browser DevTools extension
/// allows visualization and time-travel debugging
/// </summary>
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

/// <summary>Selector functions for easy state access</summary>

/// Get all posts from state
export const selectPosts = (state) => state.posts.posts;

/// Get current post (single post detail)
export const selectCurrentPost = (state) => state.posts.currentPost;

/// Get loading state
export const selectLoading = (state) => state.posts.loading;

/// Get loading by ID state
export const selectLoadingById = (state) => state.posts.loadingById;

/// Get error message
export const selectError = (state) => state.posts.error;

/// Get success message
export const selectSuccess = (state) => state.posts.success;
