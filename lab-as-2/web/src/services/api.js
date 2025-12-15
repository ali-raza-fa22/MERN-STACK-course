/// <summary>API service for managing posts and categories</summary>

const API_BASE_URL = "http://localhost:3000/api";

/// <summary>Handles API responses and throws friendly errors</summary>
const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

/// Posts API endpoints
export const postsAPI = {
  /// <summary>Fetch all posts</summary>
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/posts`);
    return handleResponse(response);
  },

  /// <summary>Fetch single post by ID</summary>
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    return handleResponse(response);
  },

  /// <summary>Create new post</summary>
  create: async (post) => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    return handleResponse(response);
  },

  /// <summary>Update existing post</summary>
  update: async (id, post) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    return handleResponse(response);
  },

  /// <summary>Delete post by ID</summary>
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },
};
