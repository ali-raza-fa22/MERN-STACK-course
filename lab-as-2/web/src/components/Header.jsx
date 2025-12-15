/// <summary>
/// Header component - Demonstrates functional JSX with props destructuring
/// Props: title (string), subtitle (string)
/// Lifecycle: Renders once, updates only if props change (Pure Component pattern)
/// </summary>
export default function Header({ title, subtitle }) {
  return (
    <header className="mb-8 animate-fadeIn">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-600 text-lg">{subtitle}</p>
    </header>
  );
}
