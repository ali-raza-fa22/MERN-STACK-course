import { useEffect } from "react";

/// <summary>
/// Post Modal Component - Demonstrates conditional rendering and lifecycle hooks
/// Props: viewingPost (object), onClose (function), onEdit (function)
/// Virtual DOM: Only renders when viewingPost is not null
/// Lifecycle: useEffect handles escape key and body scroll lock
/// </summary>
export default function PostModal({ viewingPost, onClose, onEdit }) {
  /// <summary>Lifecycle hooks - Handle keyboard events and body scroll lock</summary>
  useEffect(() => {
    if (!viewingPost) return;

    /// <summary>Lock body scroll when modal is open</summary>
    document.body.style.overflow = "hidden";

    /// <summary>Handle Escape key to close modal</summary>
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    /// <summary>Cleanup: Restore scroll and remove event listener on unmount or viewingPost change</summary>
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [viewingPost, onClose]);

  /// <summary>Conditional rendering - return null if no post to view</summary>
  if (!viewingPost) return null;

  /// <summary>Handle backdrop click to close modal</summary>
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  /// <summary>Handle edit and close workflow</summary>
  const handleEditClick = () => {
    onClose();
    onEdit(viewingPost);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={handleBackdropClick}
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 animate-slideUp">
        {/* Modal Header */}
        <div className="flex items-start justify-between mb-4">
          <h2 id="modal-title" className="text-2xl font-bold text-gray-800">
            {viewingPost.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <p className="text-gray-600 mb-6 whitespace-pre-wrap leading-relaxed">
          {viewingPost.content}
        </p>

        {/* Modal Footer - Action buttons */}
        <div className="flex gap-2 border-t pt-4">
          <button
            onClick={handleEditClick}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 active:scale-95"
            aria-label="Edit this post"
          >
            Edit
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors duration-200 active:scale-95"
            aria-label="Close modal"
          >
            Close
          </button>
        </div>

        {/* Keyboard hint */}
        <p className="text-xs text-gray-400 mt-4 text-center">
          Press ESC to close
        </p>
      </div>
    </div>
  );
}
