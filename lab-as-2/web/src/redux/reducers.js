import * as types from "./actionTypes";

/// <summary>
/// Initial state for posts reducer
/// Tracks: posts list, loading state, errors, and individual post data
/// </summary>
const initialState = {
  posts: [],
  currentPost: null,
  loading: false,
  loadingById: false,
  error: null,
  success: null,
};

/// <summary>
/// Posts Reducer - Pure function that updates state based on actions
/// Demonstrates immutable state updates (never mutate state directly)
/// </summary>
export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    /// Fetch all posts states
    case types.POSTS_FETCH_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.POSTS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: null,
      };

    case types.POSTS_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    /// Fetch post by ID states
    case types.POST_FETCH_BY_ID_START:
      return {
        ...state,
        loadingById: true,
        error: null,
      };

    case types.POST_FETCH_BY_ID_SUCCESS:
      return {
        ...state,
        loadingById: false,
        currentPost: action.payload,
        error: null,
      };

    case types.POST_FETCH_BY_ID_ERROR:
      return {
        ...state,
        loadingById: false,
        error: action.payload,
      };

    /// Create post states
    case types.POST_CREATE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.POST_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [action.payload, ...state.posts],
        success: "Post created successfully!",
        error: null,
      };

    case types.POST_CREATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    /// Update post states
    case types.POST_UPDATE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.POST_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: "Post updated successfully!",
        error: null,
      };

    case types.POST_UPDATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    /// Delete post states
    case types.POST_DELETE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.POST_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id !== action.payload),
        success: "Post deleted successfully!",
        error: null,
      };

    case types.POST_DELETE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    /// Clear error/success
    case types.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case types.CLEAR_SUCCESS:
      return {
        ...state,
        success: null,
      };

    default:
      return state;
  }
};
