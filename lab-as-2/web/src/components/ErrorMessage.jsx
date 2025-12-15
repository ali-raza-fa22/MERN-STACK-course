import { useEffect } from "react";

/// <summary>
/// Error Message component - Demonstrates conditional rendering and lifecycle hooks
/// Props: error (string), onDismiss (function)
/// Lifecycle: Mounts with error, auto-dismisses or manual dismiss
/// Virtual DOM: Re-renders when error changes
/// </summary>
export default function ErrorMessage({ error, onDismiss }) {
  /// <summary>Auto-dismiss error after 5 seconds - demonstrates useEffect lifecycle</summary>
  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);

    /// <summary>Cleanup: Clear timer on component unmount or error change</summary>
    return () => clearTimeout(timer);
  }, [error, onDismiss]);

  if (!error) return null;

  return (
    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-slideDown">
      <p className="text-red-700 font-medium">⚠️ {error}</p>
      <button
        onClick={onDismiss}
        className="text-red-600 text-sm mt-2 hover:underline transition-colors"
        aria-label="Dismiss error message"
      >
        Dismiss
      </button>
    </div>
  );
}
