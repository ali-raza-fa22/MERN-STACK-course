import { postsAPI } from "../services/api";
import * as types from "./actionTypes";

/// <summary>
/// Redux Thunk Actions - Async action creators
/// Thunk middleware allows dispatching functions instead of plain objects
/// These functions receive dispatch and getState as parameters
/// Perfect for API calls and async operations
/// </summary>

/// <summary>Thunk action to fetch all posts - handles async API call</summary>
export const fetchPosts = () => async (dispatch, getState) => {
  dispatch({ type: types.POSTS_FETCH_START });

  try {
    const response = await postsAPI.getAll();
    dispatch({
      type: types.POSTS_FETCH_SUCCESS,
      payload: response.data || [],
    });
  } catch (error) {
    dispatch({
      type: types.POSTS_FETCH_ERROR,
      payload: error.message || "Failed to fetch posts",
    });
  }
};

/// <summary>Thunk action to fetch post by ID</summary>
export const fetchPostById = (id) => async (dispatch) => {
  dispatch({ type: types.POST_FETCH_BY_ID_START });

  try {
    const response = await postsAPI.getById(id);
    dispatch({
      type: types.POST_FETCH_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.POST_FETCH_BY_ID_ERROR,
      payload: error.message || "Failed to fetch post",
    });
  }
};

/// <summary>Thunk action to create a new post</summary>
export const createPost = (postData) => async (dispatch) => {
  dispatch({ type: types.POST_CREATE_START });

  try {
    const response = await postsAPI.create(postData);
    dispatch({
      type: types.POST_CREATE_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: types.POST_CREATE_ERROR,
      payload: error.message || "Failed to create post",
    });
    throw error;
  }
};

/// <summary>Thunk action to update a post</summary>
export const updatePost = (id, postData) => async (dispatch) => {
  dispatch({ type: types.POST_UPDATE_START });

  try {
    const response = await postsAPI.update(id, postData);
    dispatch({
      type: types.POST_UPDATE_SUCCESS,
      payload: response.data,
    });
    // Refetch posts after update
    dispatch(fetchPosts());
    return response.data;
  } catch (error) {
    dispatch({
      type: types.POST_UPDATE_ERROR,
      payload: error.message || "Failed to update post",
    });
    throw error;
  }
};

/// <summary>Thunk action to delete a post</summary>
export const deletePost = (id) => async (dispatch) => {
  dispatch({ type: types.POST_DELETE_START });

  try {
    await postsAPI.delete(id);
    dispatch({
      type: types.POST_DELETE_SUCCESS,
      payload: id,
    });
    // Refetch posts after delete
    dispatch(fetchPosts());
  } catch (error) {
    dispatch({
      type: types.POST_DELETE_ERROR,
      payload: error.message || "Failed to delete post",
    });
    throw error;
  }
};

/// <summary>Synchronous action to clear error message</summary>
export const clearError = () => ({
  type: types.CLEAR_ERROR,
});

/// <summary>Synchronous action to clear success message</summary>
export const clearSuccess = () => ({
  type: types.CLEAR_SUCCESS,
});
