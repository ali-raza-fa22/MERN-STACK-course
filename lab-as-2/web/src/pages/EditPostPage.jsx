import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostById,
  updatePost as updatePostAction,
  clearError,
} from "../redux/actions";
import { selectCurrentPost, selectLoading, selectError } from "../redux/store";

/// <summary>
/// Edit Post Page - Redux Version
/// Demonstrates:
/// - Controlled Components with Redux state
/// - useDispatch for Redux thunk actions
/// - useSelector for accessing Redux state
/// - Real-time validation and character counts
/// </summary>
export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /// <summary>Redux selectors - Get state from store</summary>
  const currentPost = useSelector(selectCurrentPost);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [submitting, setSubmitting] = useState(false);

  /// <summary>Controlled component state - updates trigger re-renders</summary>
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  /// <summary>Lifecycle hook - Fetch post data on mount using Redux thunk</summary>
  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [id, dispatch]);

  /// <summary>Update form when post data is fetched from Redux</summary>
  useEffect(() => {
    if (currentPost) {
      setFormData({
        title: currentPost.title,
        content: currentPost.content,
      });
    }
  }, [currentPost]);

  /// <summary>Handle controlled component input changes</summary>
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Virtual DOM updates on each keystroke
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /// <summary>Handle form submission with Redux thunk dispatch</summary>
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    if (!formData.title.trim() || !formData.content.trim()) {
      // setError would be replaced by Redux dispatch
      return;
    }

    try {
      setSubmitting(true);
      await dispatch(updatePostAction(id, formData));
      navigate("/");
    } catch (err) {
      // Error is handled by Redux reducer
    } finally {
      setSubmitting(false);
    }
  };

  /// <summary>Handle cancel - navigate back</summary>
  const handleCancel = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Post</h1>
          <p className="text-gray-600 mb-6">
            Update your post using controlled components with real-time feedback
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
            {/* Controlled Title Input - Updates state on every change */}
            <div>
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium mb-2"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
                placeholder="Enter post title"
                maxLength={100}
              />
              {/* Character count - demonstrates Virtual DOM updates */}
              <p className="text-xs text-gray-400 mt-1">
                {formData.title.length}/100
              </p>
            </div>

            {/* Controlled Content Textarea - Updates state on every change */}
            <div>
              <label
                htmlFor="content"
                className="block text-gray-700 font-medium mb-2"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition h-40 resize-none"
                placeholder="Enter post content"
                maxLength={5000}
              />
              {/* Character count - demonstrates Virtual DOM updates */}
              <p className="text-xs text-gray-400 mt-1">
                {formData.content.length}/5000
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Updating..." : "Update Post"}
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
