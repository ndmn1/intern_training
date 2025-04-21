import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchUserById } from "@/store/slices/usersSlice"
import { fetchPostsByUserId } from "@/store/slices/postsSlice"
import { Link, useParams } from "react-router-dom"
import PostCard from "@/components/Post/PostCard"
import UserProfile from "@/components/User/UserProfile"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import ErrorMessage from "@/components/ui/ErrorMessage"
import { FaArrowLeft } from "react-icons/fa"

export default function UserPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { user, status: userStatus, error: userError } = useAppSelector((state) => state.users)
  const { posts, status: postsStatus, error: postsError } = useAppSelector((state) => state.posts)

  useEffect(() => {
      if (id) {
      dispatch(fetchUserById(Number.parseInt(id)))
      dispatch(fetchPostsByUserId(Number.parseInt(id)))
    }
  }, [dispatch, id])

  const isLoading = userStatus === "loading" || postsStatus === "loading"
  const hasError = userStatus === "failed" || postsStatus === "failed"
  const errorMessage = userError || postsError

  if (isLoading) return <LoadingSpinner />
  if (hasError) return <ErrorMessage message={errorMessage || "An error occurred"} />
  if (!user) return <ErrorMessage message="User not found" />

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <FaArrowLeft className="mr-2" /> Back to posts
      </Link>

      <UserProfile user={user} />

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Posts by {user.name}</h2>

        {posts.length === 0 ? (
          <p className="text-gray-600">No posts found for this user.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
