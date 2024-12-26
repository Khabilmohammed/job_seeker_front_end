import React, { useState } from "react";
import { useGetChattedUsersQuery } from "../../Apis/messageApi";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (selectedUsers: any[]) => void; // Update type to accept the full user object
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, onShare }) => {
  const {
    data: chattedUsers = [],
    isLoading: isLoadingUsers,
    error: usersError,
  } = useGetChattedUsersQuery({});

  const [selectedUsers, setSelectedUsers] = useState<any[]>([]); // Use 'any' to store the full user data

  const handleCheckboxChange = (user: any) => { // Accept the full user object as the parameter
    setSelectedUsers((prev) =>
      prev.includes(user)
        ? prev.filter((selectedUser) => selectedUser.userId !== user.userId)
        : [...prev, user]
    );
  };

  const handleShare = () => {
    onShare(selectedUsers); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Share Post</h2>
        <div className="flex flex-col gap-2">
          {isLoadingUsers && <p>Loading users...</p>}
          {usersError && <p className="text-red-500">Failed to load users.</p>}
          {!isLoadingUsers && chattedUsers.length === 0 && (
            <p>No chatted users available.</p>
          )}
          {!isLoadingUsers &&
            chattedUsers.map((user: any) => (
              <label
                key={user.userId}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={user.userId} // Use userId as value for checkbox
                  onChange={() => handleCheckboxChange(user)} // Pass the full user object
                  checked={selectedUsers.some((selectedUser) => selectedUser.userId === user.userId)} // Check if the user is selected
                />
                <div className="flex items-center gap-2">
                  <img
                    src={user.profilePicture || "/default-avatar.png"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{`${user.firstName} ${user.lastName}`}</span>
                </div>
              </label>
            ))}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleShare}
            disabled={selectedUsers.length === 0}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
