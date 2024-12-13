import { useGetFollowingQuery } from "../../Apis/followApi";
import { FaUserCircle } from "react-icons/fa"; // Import an icon for dummy profile photo

const FollowingList = ({ userId }: { userId: string }) => {
  const { data: following, error, isLoading } = useGetFollowingQuery(userId);
  console.log("following",following);
  if (isLoading)
    return (
      <div className="flex justify-center items-center py-4">
        <p className="text-gray-500">Loading following...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center py-4">
        <p className="text-red-500">
          Error fetching following: {JSON.stringify(error)}
        </p>
      </div>
    );

  if (!following || following.length === 0)
    return (
      <div className="flex justify-center items-center py-4">
        <p className="text-gray-500">You're not following anyone yet.</p>
      </div>
    );

  return (
    <ul className="space-y-4">
      {following.map((follow: any) => (
        <li
          key={follow.userId}
          className="flex items-center bg-white shadow p-4 rounded-lg hover:bg-gray-50"
        >
          {/* Dummy Profile Photo */}
          <div className="flex-shrink-0 mr-4">
            {follow.profilePicture ? (
              <img
                src={follow.profilePicture}
                alt={`${follow.firstName}'s profile`}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-gray-400 text-5xl" />
            )}
          </div>


          {/* Following Details */}
          <div>
            <p className="text-lg font-semibold text-gray-800">
              {follow.firstName} {follow.lastName}
            </p>
            <p className="text-sm text-gray-500">@{follow.userName}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FollowingList;
