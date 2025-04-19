import Nav from "../Nav";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl md:text-2xl font-bold">Todo List App</div>
          <Nav />
        </div>
      </div>
    </header>
  );
}
