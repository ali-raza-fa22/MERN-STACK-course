/// <summary>
/// Redux Action Types
/// Defines all possible actions that can be dispatched in the application
/// Follows the pattern: ENTITY_ACTION
/// </summary>

// Posts Actions
export const POSTS_FETCH_START = "POSTS_FETCH_START";
export const POSTS_FETCH_SUCCESS = "POSTS_FETCH_SUCCESS";
export const POSTS_FETCH_ERROR = "POSTS_FETCH_ERROR";

export const POST_CREATE_START = "POST_CREATE_START";
export const POST_CREATE_SUCCESS = "POST_CREATE_SUCCESS";
export const POST_CREATE_ERROR = "POST_CREATE_ERROR";

export const POST_UPDATE_START = "POST_UPDATE_START";
export const POST_UPDATE_SUCCESS = "POST_UPDATE_SUCCESS";
export const POST_UPDATE_ERROR = "POST_UPDATE_ERROR";

export const POST_DELETE_START = "POST_DELETE_START";
export const POST_DELETE_SUCCESS = "POST_DELETE_SUCCESS";
export const POST_DELETE_ERROR = "POST_DELETE_ERROR";

export const POST_FETCH_BY_ID_START = "POST_FETCH_BY_ID_START";
export const POST_FETCH_BY_ID_SUCCESS = "POST_FETCH_BY_ID_SUCCESS";
export const POST_FETCH_BY_ID_ERROR = "POST_FETCH_BY_ID_ERROR";

export const CLEAR_ERROR = "CLEAR_ERROR";
export const CLEAR_SUCCESS = "CLEAR_SUCCESS";
