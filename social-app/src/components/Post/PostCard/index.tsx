import { Link } from "react-router-dom"
import type { Post } from "@/types"
import { useAppSelector } from "@/store/hooks"

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const { users } = useAppSelector((state) => state.users)
  const author = users.find((user) => user.id === post.userId)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2 line-clamp-2 capitalize">
          <Link to={`/posts/${post.id}`} className="text-gray-900 hover:text-blue-600 transition-colors">
            {post.title}
          </Link>
        </h2>

        {author && (
          <div className="mb-3">
            <Link to={`/users/${author.id}`} className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
              By {author.name}
            </Link>
          </div>
        )}

        <p className="text-gray-600 line-clamp-3 mb-4">{post.body}</p>

        <Link
          to={`/posts/${post.id}`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Read More
        </Link>
      </div>
    </div>
  )
}
