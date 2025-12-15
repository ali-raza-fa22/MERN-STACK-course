import { memo } from "react";

/// <summary>
/// Post Card Component - Demonstrates React.memo for Virtual DOM optimization
/// memo() prevents unnecessary re-renders when props haven't changed
/// Props: post (object), onView (function), onEdit (function), onDelete (function)
/// Virtual DOM: Only re-renders if post object reference changes
/// </summary>
const PostCard = memo(function PostCard({ post, onView, onEdit, onDelete }) {
  /// <summary>Handle delete with confirmation - demonstrates event handling</summary>
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      onDelete(post._id);
    }
  };

  return (
    <article
      className="bg-white flex flex-col justify-between rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 p-6 animate-fadeIn"
      aria-label={`Post: ${post.title}`}
    >
      {/* Post Content */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 hover:text-indigo-600">
          {post.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {post.content}
        </p>
      </div>

      {/* Action Buttons - Demonstrate callback props */}
      <div className="flex gap-2">
        <button
          onClick={() => onView(post)}
          className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg text-sm font-semibold hover:bg-gray-600 transition-colors duration-200 active:scale-95"
          aria-label={`View post: ${post.title}`}
        >
          View
        </button>
        <button
          onClick={() => onEdit(post)}
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors duration-200 active:scale-95"
          aria-label={`Edit post: ${post.title}`}
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors duration-200 active:scale-95"
          aria-label={`Delete post: ${post.title}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
});

PostCard.displayName = "PostCard";

export default PostCard;
