import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPost as createPostAction, clearError } from "../redux/actions";
import { selectLoading, selectError } from "../redux/store";

/// <summary>
/// Add Post Page - Redux Version with Uncontrolled Components
/// Demonstrates:
/// - useRef for uncontrolled form inputs
/// - Redux dispatch for async actions
/// - useSelector to get loading/error from Redux
/// - Minimal Virtual DOM updates
/// </summary>
export default function AddPostPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /// <summary>Redux selectors - Get loading and error from store</summary>
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  /// <summary>Lifecycle hook - Focus on title input on mount</summary>
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  /// <summary>Handle form submission with uncontrolled components and Redux</summary>
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    // Get values from refs (uncontrolled components)
    const title = titleRef.current?.value?.trim();
    const content = contentRef.current?.value?.trim();

    if (!title || !content) {
      // Error state would be managed by Redux dispatch
      return;
    }

    try {
      await dispatch(createPostAction({ title, content }));
      navigate("/");
    } catch (err) {
      // Error is handled by Redux reducer
    }
  };

  /// <summary>Handle cancel - navigate back</summary>
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={handleCancel}
          className="mb-6 px-4 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition"
        >
          ← Back
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Add New Post
          </h1>
          <p className="text-gray-600 mb-6">
            Create a new post using uncontrolled components
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-red-700 font-medium">⚠️ {error}</p>
              <button
                onClick={() => dispatch(clearError())}
                className="text-red-600 text-sm mt-2 hover:underline"
              >
                Dismiss
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Uncontrolled Title Input - Uses ref to access value */}
            <div>
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium mb-2"
              >
                Title
              </label>
              <input
                ref={titleRef}
                id="title"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                placeholder="Enter post title"
                maxLength={100}
              />
              <p className="text-xs text-gray-400 mt-1">Max 100 characters</p>
            </div>

            {/* Uncontrolled Content Textarea - Uses ref to access value */}
            <div>
              <label
                htmlFor="content"
                className="block text-gray-700 font-medium mb-2"
              >
                Content
              </label>
              <textarea
                ref={contentRef}
                id="content"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition h-40 resize-none"
                placeholder="Enter post content"
                maxLength={5000}
              />
              <p className="text-xs text-gray-400 mt-1">Max 5000 characters</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Post"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-6 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
