import React, { useState } from "react";
import { useUpdateUserMutation } from "../../Apis/userManagementApi";
import { useSelector } from "react-redux";
import { Rootstate } from "../../Storage/Redux/store";
import toastNotify from "../../Taghelper/toastNotify";

interface UserInfoProps {
  username: string;
  fullName: string;
  firstName: string;
  lastName: string;
  bio: string;
  profilePicture: string | null;
  city: string;
  country: string;
  pincode: string;
  followingCount: number;
  followersCount: number;
  postCount: number;
}

const UserInfo: React.FC<UserInfoProps> = ({
  username,
  fullName,
  firstName,
  lastName,
  bio,
  profilePicture,
  city,
  country,
  pincode,
  followingCount,
  followersCount,
  postCount,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const [formData, setFormData] = useState({
    UserId:userId,
    firstName,
    lastName,
    city,
    country,
    pincode,
    profilePicture: profilePicture || null,
  });

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, ProfilePictureFile: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formPayload = new FormData();
  
    if (!formData.UserId) {
      console.error("UserId is missing in the payload.");
      return alert("UserId is required to update the profile.");
    }
  
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === "profilePicture" && value !== null) {
          formPayload.append(key, value); 
        } else {
          formPayload.append(key, value as string);
        }
      }
    });
  
    try {
      await updateUser(formPayload).unwrap();
      toastNotify("Profile updated successfully!","success");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toastNotify("Failed to update profile.","error");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center">
      <div className="flex-shrink-0 mb-4 md:mb-0">
        <img
          className="w-32 h-32 rounded-full object-cover border-2 border-blue-500"
          src={previewImage || profilePicture || "https://via.placeholder.com/150"}
          alt="Profile"
        />
      </div>

      <div className="flex-1 ml-0 md:ml-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-gray-800">{username}</h2>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>
        <div className="mt-2">
          <p className="text-gray-600 text-lg font-semibold">{fullName}</p>
          <p className="text-gray-500 text-sm">{bio}</p>
          <p className="text-gray-500 text-sm">
            {city}, {country} - {pincode}
          </p>
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

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="w-full mb-4 p-2 border rounded"
              />
              
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="w-full mb-4 p-2 border rounded"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="w-full mb-4 p-2 border rounded"
              />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Country"
                className="w-full mb-4 p-2 border rounded"
              />
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Pincode"
                className="w-full mb-4 p-2 border rounded"
              />
              <input
                type="file"
                name="profilePicture"
                onChange={handleFileChange}
                className="w-full mb-4 p-2 border rounded"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded mr-2"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
