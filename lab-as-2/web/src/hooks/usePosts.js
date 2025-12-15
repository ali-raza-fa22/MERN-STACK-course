import { useState, useEffect, useCallback } from "react";
import { postsAPI } from "../services/api";

/// <summary>Custom hook for managing posts data and API operations with lifecycle management</summary>
export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /// <summary>Fetch posts from API - lifecycle hook for component mount</summary>
  useEffect(() => {
    fetchPosts();

    /// <summary>Cleanup function - runs on unmount</summary>
    return () => {
      console.log("Cleaning up posts hook");
    };
  }, []);

  /// <summary>Fetch posts with error handling</summary>
  const fetchPosts = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await postsAPI.getAll();
      setPosts(response.data || []);
    } catch (err) {
      setError(
        err.message || "Failed to load data. Please check your connection."
      );
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /// <summary>Create new post and refresh list</summary>
  const createPost = useCallback(
    async (postData) => {
      try {
        setError(null);
        await postsAPI.create(postData);
        await fetchPosts();
      } catch (err) {
        setError(err.message || "Failed to create post");
        throw err;
      }
    },
    [fetchPosts]
  );

  /// <summary>Update existing post and refresh list</summary>
  const updatePost = useCallback(
    async (id, postData) => {
      try {
        setError(null);
        await postsAPI.update(id, postData);
        await fetchPosts();
      } catch (err) {
        setError(err.message || "Failed to update post");
        throw err;
      }
    },
    [fetchPosts]
  );

  /// <summary>Delete post and refresh list</summary>
  const deletePost = useCallback(
    async (id) => {
      try {
        setError(null);
        await postsAPI.delete(id);
        await fetchPosts();
      } catch (err) {
        setError(err.message || "Failed to delete post");
        throw err;
      }
    },
    [fetchPosts]
  );

  return {
    posts,
    loading,
    error,
    setError,
    createPost,
    updatePost,
    deletePost,
    refetch: fetchPosts,
  };
}
