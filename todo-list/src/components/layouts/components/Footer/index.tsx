export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-600 text-white py-1">
      <div className="px-4">
          &copy; {currentYear} Todo List App.
      </div>
    </footer>
  );
}
