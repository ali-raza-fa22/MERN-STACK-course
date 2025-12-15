import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import PostModal from "../components/PostModal";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import {
  fetchPosts,
  deletePost as deletePostAction,
  clearError,
} from "../redux/actions";
import { selectPosts, selectLoading, selectError } from "../redux/store";
import { useState } from "react";

/// <summary>
/// Home Page Component - Redux Version
/// Demonstrates:
/// - useDispatch for dispatching Redux actions
/// - useSelector for accessing Redux state
/// - useEffect for async thunk dispatching
/// - React Router useNavigate for navigation
/// </summary>
export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /// <summary>Redux selectors - Get state from store</summary>
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [viewingPost, setViewingPost] = useState(null);

  /// <summary>Fetch posts on component mount using Redux thunk</summary>
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  /// <summary>Handle navigate to add post page</summary>
  const handleAddPost = () => {
    navigate("/add");
  };

  /// <summary>Handle navigate to edit post page</summary>
  const handleEditPost = (post) => {
    navigate(`/edit/${post._id}`);
  };

  /// <summary>Handle post deletion with Redux action</summary>
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }
    dispatch(deletePostAction(id));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <Header
          title="Blog Manager"
          subtitle="Manage your blog posts with ease"
        />

        {error && (
          <ErrorMessage
            error={error}
            onDismiss={() => dispatch(clearError())}
          />
        )}

        {loading && <LoadingSpinner />}

        {!loading && (
          <>
            {/* Add Post Button */}
            <button
              onClick={handleAddPost}
              className="mb-6 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition active:scale-95"
              aria-label="Create new post"
            >
              ➕ New Post
            </button>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <p className="text-lg">
                    No posts yet. Create one to get started!
                  </p>
                </div>
              ) : (
                posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    onView={setViewingPost}
                    onEdit={handleEditPost}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>
          </>
        )}

        {/* Post Detail Modal */}
        {viewingPost && (
          <PostModal post={viewingPost} onClose={() => setViewingPost(null)} />
        )}
      </div>
    </div>
  );
}
