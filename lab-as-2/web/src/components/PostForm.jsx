import { useEffect } from "react";

/// <summary>
/// Post Form Component - Demonstrates controlled components and lifecycle hooks
/// Props: formData (object), editingId (string), onSubmit (function), onChange (function), onCancel (function)
/// Virtual DOM: Re-renders only when formData or editingId changes via deps
/// Lifecycle: useEffect watches editingId to focus on title input when editing
/// </summary>
export default function PostForm({
  formData,
  editingId,
  onSubmit,
  onChange,
  onCancel,
}) {
  /// <summary>Lifecycle hook - Focus on title input when entering edit mode</summary>
  useEffect(() => {
    if (editingId) {
      const titleInput = document.querySelector('input[name="title"]');
      titleInput?.focus();
    }
  }, [editingId]);

  /// <summary>Handle form submission - prevents default and calls parent handler</summary>
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please fill in all fields");
      return;
    }

    onSubmit(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-6 bg-white rounded-lg shadow-md border-l-4 border-indigo-600 animate-slideDown"
    >
      {/* Title Input - Controlled component, Virtual DOM updates on change */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
          placeholder="Enter post title"
          maxLength={100}
        />
        <p className="text-xs text-gray-400 mt-1">
          {formData.title.length}/100
        </p>
      </div>

      {/* Content Textarea - Controlled component with character count */}
      <div className="mb-4">
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
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition h-32 resize-none"
          placeholder="Enter post content"
          maxLength={5000}
        />
        <p className="text-xs text-gray-400 mt-1">
          {formData.content.length}/5000
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 active:scale-95"
        >
          {editingId ? "Update Post" : "Create Post"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
