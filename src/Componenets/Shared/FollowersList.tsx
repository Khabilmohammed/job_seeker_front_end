import { useGetFollowersQuery } from "../../Apis/followApi";
import { FaUserCircle } from "react-icons/fa"; 
import { Rootstate } from "../../Storage/Redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FollowersList = ({ userId }: { userId: string }) => {
  const { data: followers, error, isLoading } = useGetFollowersQuery(userId);
  const userRole = useSelector((state: Rootstate) => state.userAuthStore.role);
  const navigate = useNavigate();

const handleProfileClick = (person: any) => {
  if (userRole === "company") {
    if (person.userRole === "company") navigate(`/company/getCompanyProfiePage/${person.userId}`);
    else navigate(`/company/getUserProfilePage/${person.userId}`);
  } else {
    if (person.userRole === "company") navigate(`/user/getCompanyProfiePage/${person.userId}`);
    else navigate(`/user/getUserProfilePage/${person.userId}`);
  }
};
  if (isLoading)
    return (
      <div className="flex justify-center items-center py-4">
        <p className="text-gray-500">Loading followers...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center py-4">
        <p className="text-red-500">
          Error fetching followers: {JSON.stringify(error)}
        </p>
      </div>
    );

  if (!followers || followers.length === 0)
    return (
      <div className="flex justify-center items-center py-4">
        <p className="text-gray-500">You don't have any followers yet.</p>
      </div>
    );

  return (
    <ul className="space-y-4">
      {followers.map((follower: any) => (
        <li
          key={follower.userId}
          className="flex items-center bg-white shadow p-4 rounded-lg hover:bg-gray-50"
        >
          {/* Dummy Profile Photo */}
          <div className="flex-shrink-0 mr-4">
            {follower.profilePicture ? (
              <img
                src={follower.profilePicture}
                alt={`${follower.firstName}'s profile`}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-gray-400 text-5xl" />
            )}
          </div>

          {/* Follower Details */}
          <div>
            <p
              onClick={() => handleProfileClick(follower)}
              className="text-lg font-semibold text-gray-800 hover:underline cursor-pointer"
            >
              {follower.firstName} {follower.lastName}
            </p>

          </div>
        </li>
      ))}
    </ul>
  );
};

export default FollowersList;
