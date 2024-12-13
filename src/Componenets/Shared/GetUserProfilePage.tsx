import React, { useEffect, useState } from 'react';
import { CertificateModel } from '../../Interfaces/CertificateModel';
import { ExperienceModel } from '../../Interfaces/ExperienceModel';
import { EducationModel } from '../../Interfaces/EducationModel';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetExperiencesQuery } from '../../Apis/experienceApi';
import { useGetCertificatesByUserQuery } from '../../Apis/certificateApi';
import { useGetEducationsByUserQuery } from '../../Apis/educationApi';
import { useGetUserByIdQuery } from '../../Apis/userManagementApi';
import ReadOnlyUserPosts from './ReadOnlyUserPosts';
import ReadonlyUserExperience from './ReadonlyUserExperience';
import UserEducationReadonly from './UserEducationReadonly';
import ReadOnlyUserCertificates from './ReadOnlyUserCertificates';
import ReadOnlyUserInfo from './ReadOnlyUserInfo';
import { useIsFollowingQuery } from '../../Apis/followApi';
import { Rootstate } from '../../Storage/Redux/store';
import { useSelector } from 'react-redux';

function GetUserProfilePage() {
  const { userid } = useParams<{ userid: string }>();
  const loggedInUserId = useSelector((state: Rootstate) => state.userAuthStore.id); // Assuming you store the logged-in user ID in localStorage
  const navigate=useNavigate();
  const [userInfo, setUserInfo] = useState<{
    username: string;
    fullName: string;
    bio: string;
    education: EducationModel[];
    experiences: ExperienceModel[];
    certificates: CertificateModel[];
    profilePicture: string;
    followingCount: number;
    followersCount: number;
    postCount: number;
    isFollowing: boolean;
  }>({
    username: 'username',
    fullName: 'Full Name',
    bio: 'Software Developer | Tech Enthusiast | #LifeInCode',
    education: [],
    experiences: [],
    certificates: [],
    profilePicture: 'https://via.placeholder.com/150',
    followingCount: 0,
    followersCount: 0,
    postCount: 0,
    isFollowing: false,
  });

  const { data: userData, isSuccess: isUserSuccess } = useGetUserByIdQuery(userid);
  const { data: experiencesData } = useGetExperiencesQuery(userid);
  const { data: certificatesData } = useGetCertificatesByUserQuery(userid);
  const { data: educationData } = useGetEducationsByUserQuery(userid);
  const { data: followStatusData, isSuccess: isFollowStatusSuccess } = useIsFollowingQuery({
    followerId: loggedInUserId!,
    followingId: userid!,
  });

  const handleFollowChange = (isFollowing: boolean) => {
    setUserInfo((prev) => ({ ...prev, isFollowing }));
  };

  const handleMessageClick = () => {
    navigate(`/chat/${userid}`);
  };

  useEffect(() => {
    if (isUserSuccess && userData?.isSuccess) {
      const result = userData.result;

      setUserInfo((prev) => ({
        ...prev,
        username: result.userName || prev.username,
        fullName: `${result.firstName} ${result.middleName || ''} ${result.lastName}`.trim(),
        bio: `Based in ${result.city}, ${result.country}`,
        profilePicture: result.profilePicture || prev.profilePicture,
        followingCount: result.followingCount || 0,
        followersCount: result.followersCount || 0,
        postCount: result.postCount || 0,
      }));
    }
  }, [userData, isUserSuccess]);

  useEffect(() => {
    if (isFollowStatusSuccess && followStatusData?.isFollowing !== undefined) {
      setUserInfo((prev) => ({ ...prev, isFollowing: followStatusData.isFollowing }));
    }
  }, [followStatusData, isFollowStatusSuccess]);

  useEffect(() => {
    if (experiencesData?.isSuccess) {
      setUserInfo((prev) => ({ ...prev, experiences: experiencesData.result }));
    }
    if (certificatesData?.isSuccess) {
      setUserInfo((prev) => ({ ...prev, certificates: certificatesData.result }));
    }
    if (educationData?.isSuccess) {
      setUserInfo((prev) => ({ ...prev, education: educationData.result as EducationModel[] }));
    }
  }, [experiencesData, certificatesData, educationData]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* User Info Section */}
      <ReadOnlyUserInfo
        username={userInfo.username}
        fullName={userInfo.fullName}
        bio={userInfo.bio}
        profilePicture={userInfo.profilePicture}
        followingCount={userInfo.followingCount}
        followersCount={userInfo.followersCount}
        postCount={userInfo.postCount}
        isFollowing={userInfo.isFollowing}
        onFollowChange={handleFollowChange}
      />

      {/* User Experience Section */}
      <ReadonlyUserExperience experiences={userInfo.experiences} />

      {/* User Education Section */}
      <UserEducationReadonly education={userInfo.education} />

      {/* User Certificates Section */}
      <ReadOnlyUserCertificates certificates={userInfo.certificates} />

      {/* User Posts Section */}
      <ReadOnlyUserPosts />
    </div>
  );
}

export default GetUserProfilePage;
