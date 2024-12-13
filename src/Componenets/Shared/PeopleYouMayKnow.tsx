import React from "react";
import { useGetPeopleYouMayKnowQuery } from "../../Apis/followApi";
import { Rootstate } from "../../Storage/Redux/store";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";

const PeopleYouMayKnow: React.FC = () => {
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const { data, error, isLoading } = useGetPeopleYouMayKnowQuery({ userId, count: 5 });

  if (isLoading) return <div className="text-white">Loading suggestions...</div>;
  if (error) return <div className="text-white">Failed to load suggestions.</div>;

  return (
    <div className="people-you-may-knowbg-[#1a1a1a] p-4 rounded-md shadow-md">
      <h3 className="text-white text-lg font-bold mb-4">People You May Know</h3>
      {data && data.length > 0 ? (
        <div className="space-y-4">
          {data.map((person: any) => (
            <div
              key={person.userId}
              className="flex items-center bg-gray-800 p-4 rounded-md shadow-md"
            >
              {/* Profile Picture Placeholder */}
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
              {/* User Info */}
              <div className="ml-4 flex-1">
                <p className="text-white font-semibold">
                  {person.firstName} {person.lastName}
                </p>
                <p className="text-gray-400 text-sm">Suggested for you</p>
              </div>
              {/* Follow Button */}
              <button
                className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                onClick={() => console.log(`Follow ${person.userId}`)}
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">No suggestions available.</p>
      )}
    </div>
  );
};

export default PeopleYouMayKnow;
