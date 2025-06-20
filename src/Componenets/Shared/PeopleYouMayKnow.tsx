import React, { useState } from "react";
import {
  useFollowUserMutation,
  useGetPeopleYouMayKnowQuery,
  useUnfollowUserMutation
} from "../../Apis/followApi";
import { Rootstate } from "../../Storage/Redux/store";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import toastNotify from "../../Taghelper/toastNotify";
import {  useNavigate } from "react-router-dom";

const PeopleYouMayKnow: React.FC = () => {
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const userRole = useSelector((state: Rootstate) => state.userAuthStore.role);
  const { data, error, isLoading } = useGetPeopleYouMayKnowQuery({ userId, count: 5 });
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const navigate = useNavigate();
  const [followStatus, setFollowStatus] = useState<Record<string, boolean>>({});

  const handleProfileClick = (person: any) => {
  if (userRole === 'company') {
    if (person.userRole === 'company') {
      navigate(`/company/getCompanyProfiePage/${person.userId}`);
    } else {
      navigate(`/company/getUserProfilePage/${person.userId}`);
    }
  } else {
    if (person.userRole === 'company') {
      navigate(`/user/getCompanyProfiePage/${person.userId}`);
    } else {
      
      navigate(`/user/getUserProfilePage/${person.userId}`);
    }
  }
};
  


  const handleFollowToggle = async (targetUserId: string, currentlyFollowing: boolean) => {
    try {
      if (currentlyFollowing) {
        await unfollowUser({ followerId: userId, followingId: targetUserId });
        setFollowStatus((prev) => ({ ...prev, [targetUserId]: false }));
        toastNotify("Unfollowed successfully", "success");
      } else {
        await followUser({ followerId: userId, followingId: targetUserId });
        setFollowStatus((prev) => ({ ...prev, [targetUserId]: true }));
        toastNotify("Followed successfully", "success");
      }
    } catch (error) {
      console.error("Follow toggle failed:", error);
    }
  };

  if (isLoading) return <div className="text-white">Loading suggestions...</div>;
  if (error) return <div className="text-white">Failed to load suggestions.</div>;

  return (
    <div className="bg-[#1a1a1a] p-4 rounded-md shadow-md">
      <h3 className="text-white text-lg font-bold mb-4">People You May Know</h3>
      {data && data.length > 0 ? (
        <div className="space-y-4">
          {data.map((person: any) => {
            const isFollowing = followStatus[person.userId] ?? person.isFollowing;

            return (
              <div
                key={person.userId}
                className="flex items-center bg-gray-800 p-4 rounded-md shadow-md"
              >
                {/* Profile Picture */}
                <div className="w-16 h-16 rounded-full flex-shrink-0 overflow-hidden">
                  {person.profilePicture ? (
                    <img
                      src={person.profilePicture}
                      alt={`${person.firstName}'s profile`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="w-full h-full text-gray-500" />
                  )}
                </div>

                {/* Info */}
                <div className="ml-4 flex-1">
                  <p
                    onClick={() => handleProfileClick(person)}
                    className="text-white font-semibold hover:underline cursor-pointer"
                  >
                    {person.firstName} {person.lastName}
                  </p>
                  <p className="text-gray-400 text-sm">@{person.userName}</p>
                  <p className="text-gray-500 text-xs">Suggested for you</p>
                </div>
                {/* Follow/Unfollow Button */}
                <button
                  onClick={() => handleFollowToggle(person.userId, isFollowing)}
                  className={`px-4 py-1 text-white rounded-md ${
                    isFollowing ? "bg-gray-600 hover:bg-gray-500" : "bg-blue-600 hover:bg-blue-500"
                  }`}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-white">No suggestions available.</p>
      )}
    </div>
  );
};

export default PeopleYouMayKnow;
