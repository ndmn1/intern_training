"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchPosts } from "@/store/slices/postsSlice"
import PostCard from "@/components/Post/PostCard"
import Pagination from "@/components/ui/Pagination"
import SearchBar from "@/components/ui/SearchBar"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import ErrorMessage from "@/components/ui/ErrorMessage"
import { Link } from "react-router-dom"
import { fetchAllUsers } from "@/store/slices/usersSlice"

export default function HomePage() {
  const dispatch = useAppDispatch()
  const { posts, status, error, totalCount } = useAppSelector((state) => state.posts)
  const [currentPage, setCurrentPage] = useState(1)
  const [userId, setUserId] = useState("")
  const postsPerPage = 9

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPosts({ page: currentPage, limit: postsPerPage, userId }))
  }, [dispatch, currentPage, userId])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSearch = (id: string) => {
    setUserId(id)
    setCurrentPage(1)
  }

  const handleClearSearch = () => {
    setUserId("")
    setCurrentPage(1)
  }

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Latest Blog Posts</h1>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
          <Link
            to="/new"
            className="inline-flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Create New Post
          </Link>
        </div>
      </div>

      {status === "loading" && <LoadingSpinner />}

      {status === "failed" && <ErrorMessage message={error || "An error occurred"} />}

      {status === "succeeded" && (
        <>
          {posts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl text-gray-600">No posts found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalCount / postsPerPage)}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  )
}
