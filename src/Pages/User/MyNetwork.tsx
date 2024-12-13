import React from "react";
import FollowingList from "../../Componenets/Shared/FollowingList";
import FollowersList from "../../Componenets/Shared/FollowersList";
import { useSelector } from "react-redux";
import { Rootstate } from "../../Storage/Redux/store";

const MyNetwork = () => {
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 py-4 ">
        My Network
      </h1>
      <div className="flex flex-col md:flex-row gap-6 p-6 bg-gradient-to-r from-blue-50 to-gray-100 min-h-screen">
        {/* Left Column: Following */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4 border-b pb-2">
            Following
          </h2>
          <FollowingList userId={userId} />
        </div>

        {/* Right Column: Followers */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4 border-b pb-2">
            Followers
          </h2>
          <FollowersList userId={userId} />
        </div>
      </div>
    </>
  );
};

export default MyNetwork;
