import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import clsx from "clsx";
import * as constants from "@/constants/routes";
interface NavItem {
  name: string;
  path: string;
}

export default function Nav(): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navItems: NavItem[] = [
    { name: "Tasks", path: constants.HOME },
    { name: "Add Task", path: constants.NEW },
    { name: "Trash", path: constants.TRASH },
  ];

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-md hover:bg-purple-700 focus:outline-none"
        >
          <HiMenu size={24} />
        </button>
      </div>

      {/* Desktop navigation */}
      <nav className="hidden md:flex space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={clsx(
              "hover:underline font-medium transition-colors",
              isActive(item.path) && "underline font-bold"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 top-18 bg-black opacity-20 z-30"
            onClick={() => setIsMenuOpen(false)}
          />
          <nav className="fixed right-0 top-18 h-full w-64 bg-gray-800 p-4 space-y-2 z-40">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  "block py-2 px-4 hover:bg-purple-700 rounded text-white",
                  isActive(item.path) && "bg-purple-700 font-bold"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </>
      )}
    </>
  );
}
