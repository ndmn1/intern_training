import type { User } from "@/types"
import { FaUser, FaEnvelope, FaPhone, FaGlobe, FaBuilding, FaMapMarkerAlt } from "react-icons/fa"

interface UserProfileProps {
  user: User
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="bg-gray-200 rounded-full p-6 flex items-center justify-center mb-4 md:mb-0 md:mr-6">
          <FaUser className="text-gray-500 text-4xl" />
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
          <p className="text-gray-600 mb-1">@{user.username}</p>

          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <FaEnvelope className="text-gray-500 mr-2" />
              <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
                {user.email}
              </a>
            </div>

            <div className="flex items-center">
              <FaPhone className="text-gray-500 mr-2" />
              <span>{user.phone}</span>
            </div>

            <div className="flex items-center">
              <FaGlobe className="text-gray-500 mr-2" />
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {user.website}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Company</h2>
        <div className="flex items-start">
          <FaBuilding className="text-gray-500 mr-2 mt-1" />
          <div>
            <p className="font-medium">{user.company.name}</p>
            <p className="text-gray-600">{user.company.catchPhrase}</p>
            <p className="text-gray-600">{user.company.bs}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Address</h2>
        <div className="flex items-start">
          <FaMapMarkerAlt className="text-gray-500 mr-2 mt-1" />
          <div>
            <p>
              {user.address.street}, {user.address.suite}
            </p>
            <p>
              {user.address.city}, {user.address.zipcode}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
