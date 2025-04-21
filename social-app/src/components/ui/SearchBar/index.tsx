import type React from "react"

import { useState } from "react"
import { FaSearch, FaTimes } from "react-icons/fa"

interface SearchBarProps {
  onSearch: (userId: string) => void
  onClear: () => void
}

export default function SearchBar({ onSearch, onClear }: SearchBarProps) {
  const [userId, setUserId] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(userId)
  }

  const handleClear = () => {
    setUserId("")
    onClear()
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md">
      <div className="relative flex-grow">
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Filter by user ID"
          className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {userId && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors"
      >
        <FaSearch />
      </button>
    </form>
  )
}
