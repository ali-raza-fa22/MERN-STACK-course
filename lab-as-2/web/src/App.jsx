import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddPostPage from "./pages/AddPostPage";
import EditPostPage from "./pages/EditPostPage";

/// <summary>
/// App Component - Main router setup
/// Demonstrates React Router with multiple pages
/// Routes:
/// - / (HomePage): List all posts
/// - /add (AddPostPage): Create new post with uncontrolled components
/// - /edit/:id (EditPostPage): Edit post with controlled components
/// </summary>
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add" element={<AddPostPage />} />
      <Route path="/edit/:id" element={<EditPostPage />} />
    </Routes>
  );
}
