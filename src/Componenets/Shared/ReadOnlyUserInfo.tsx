import React, { useState } from 'react';
import { useFollowUserMutation, useUnfollowUserMutation } from '../../Apis/followApi';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChatBox from './SingleMessageChatBox';
import { Rootstate } from '../../Storage/Redux/store';

interface ReadOnlyUserInfoProps {
  username: string;
  fullName: string;
  bio: string;
  profilePicture: string;
  followingCount: number;
  followersCount: number;
  postCount: number;
  isFollowing: boolean;
  onFollowChange: (isFollowing: boolean) => void;
}

const ReadOnlyUserInfo: React.FC<ReadOnlyUserInfoProps> = ({
  username,
  fullName,
  bio,
  profilePicture,
  followingCount,
  followersCount,
  postCount,
  isFollowing,
  onFollowChange,
}) => {
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const followerId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
  const { userid } = useParams<{ userid: string }>();

  const handleOpenChat = () => setIsChatBoxOpen(true);
  const handleCloseChat = () => setIsChatBoxOpen(false);

  const handleFollowToggle = async () => {
    try {
      if (!userid) throw new Error('User ID is undefined');
      if (isFollowing) {
        await unfollowUser({ followerId, followingId: userid });
        onFollowChange(false);
      } else {
        await followUser({ followerId, followingId: userid });
        onFollowChange(true);
      }
    } catch (error) {
      console.error('Failed to toggle follow status:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center">
      <div className="flex-shrink-0 mb-4 md:mb-0">
        <img
          className="w-32 h-32 rounded-full object-cover border-2 border-blue-500"
          src={profilePicture}
          alt="Profile"
        />
      </div>
      <div className="flex-1 ml-0 md:ml-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-gray-800">{username}</h2>
          <div className="mt-4 flex space-x-4">
            <button
              onClick={handleOpenChat}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Message
            </button>
            <button
              onClick={handleFollowToggle}
              className={`py-2 px-4 rounded ${isFollowing ? 'bg-gray-500 text-white' : 'bg-green-500 text-white'}`}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-gray-600 text-lg font-semibold">{fullName}</p>
          <p className="text-gray-500 text-sm">{bio}</p>
        </div>
        <div className="mt-4 flex space-x-8 text-center">
          <div>
            <p className="text-gray-800 text-lg font-bold">{postCount}</p>
            <p className="text-gray-500 text-sm">Posts</p>
          </div>
          <div>
            <p className="text-gray-800 text-lg font-bold">{followersCount}</p>
            <p className="text-gray-500 text-sm">Followers</p>
          </div>
          <div>
            <p className="text-gray-800 text-lg font-bold">{followingCount}</p>
            <p className="text-gray-500 text-sm">Following</p>
          </div>
        </div>
      </div>
      {isChatBoxOpen && (
        <ChatBox
          selectedUser={{ userName: username, fullName, profilePicture }}
          currentUserToken={localStorage.getItem('token') || ''}  
          onClose={handleCloseChat}
        />
      )}
    </div>
  );
};

export default ReadOnlyUserInfo;
