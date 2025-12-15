/// <summary>
/// Loading Spinner component - Demonstrates pure JSX rendering
/// Lifecycle: Simple conditional component, no state or effects
/// Virtual DOM: Efficient mounting/unmounting without side effects
/// </summary>
export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12 animate-fadeIn">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
      <span className="ml-4 text-gray-600 font-medium">Loading posts...</span>
    </div>
  );
}
