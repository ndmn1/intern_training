import { Link } from "react-router-dom"
import type { User } from "@/types"
import { FaUser } from "react-icons/fa"

interface UserInfoProps {
  user: User
}

export default function UserInfo({ user }: UserInfoProps) {
  return (
    <Link to={`/users/${user.id}`} className="flex items-center space-x-3 group">
      <div className="bg-gray-200 rounded-full p-2">
        <FaUser className="text-gray-500" />
      </div>
      <div>
        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{user.name}</h3>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
    </Link>
  )
}
