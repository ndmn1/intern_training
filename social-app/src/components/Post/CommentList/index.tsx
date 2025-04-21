import type { Comment } from "@/types"
import { FaUser } from "react-icons/fa"

interface CommentListProps {
  comments: Comment[]
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return <p className="text-gray-600">No comments yet.</p>
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-gray-200 rounded-full p-2 mt-1">
              <FaUser className="text-gray-500" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{comment.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{comment.email}</p>
              <p className="text-gray-700">{comment.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
