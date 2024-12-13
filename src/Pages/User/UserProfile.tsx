import React, { useEffect, useState } from 'react';
import UserInfo from '../../Componenets/Shared/UserInfo';
import UserPosts from '../../Componenets/Shared/UserPosts';
import UserExperience from '../../Componenets/User/UserExperience';
import UserEducation from '../../Componenets/User/UserEducation';
import UserCertificates from '../../Componenets/User/UserCertificates';
import { CertificateModel } from '../../Interfaces/CertificateModel';
import { ExperienceModel } from '../../Interfaces/ExperienceModel';
import { useGetExperiencesQuery, useUpdateExperienceMutation } from '../../Apis/experienceApi';
import { useGetCertificatesByUserQuery } from '../../Apis/certificateApi'; 
import { useSelector } from 'react-redux';
import { Rootstate } from '../../Storage/Redux/store';
import { useCreateCertificateMutation } from '../../Apis/certificateApi';
import { useGetEducationsByUserQuery } from '../../Apis/educationApi';
import { EducationModel } from '../../Interfaces/EducationModel';
import { useGetUserByIdQuery } from '../../Apis/userManagementApi';

function UserProfile() {
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const [userInfo, setUserInfo] = useState<{
    username: string;
    fullName: string;
    bio: string;
    education: EducationModel[];
    experiences: ExperienceModel[];
    certificates: CertificateModel[];
    profilePicture: string | null;
    city: string;
    country: string;
    pincode: string;
    firstName:string;
    MiddleName:string;
    lastName:string;
  }>({
    username: "username",
    fullName: "Full Name",
    firstName:"string",
    MiddleName:"string",
    lastName:"string",
    bio: "Software Developer | Tech Enthusiast | #LifeInCode",
    education: [],
    experiences: [],
    certificates: [],
    profilePicture: null,
    city: "City",
    country: "Country",
    pincode: "000000",
  });

  const { data: userData, isSuccess: isUserSuccess } = useGetUserByIdQuery(userId);
  console.log("userdata",userData)
  const { data: experiencesData } = useGetExperiencesQuery(userId);
  const { data: certificatesData, refetch: refetchCertificates } = useGetCertificatesByUserQuery(userId);
  const [updateExperience] = useUpdateExperienceMutation();
  const { data: educationData, refetch: refetchEducation } = useGetEducationsByUserQuery(userId);
  const [createCertificate, { isLoading: loadingCreateCertificate }] = useCreateCertificateMutation();

  useEffect(() => {
    if (isUserSuccess && userData?.isSuccess) {
      const result = userData.result;

      setUserInfo((prev) => ({
        ...prev,
        username: result.userName || prev.username,
        fullName: `${result.firstName} ${result.middleName || ''} ${result.lastName}`.trim(),
        firstName:result.firstName,
        MiddleName:result.middleName || '',
        lastName:result.lastName || ' ',
        bio: `Based in ${result.city}, ${result.country}`,
        profilePicture: result.profilePicture || prev.profilePicture,
        followingCount: result.followingCount || 0,
        followersCount: result.followersCount || 0,
        postCount: result.postCount || 0,
        city:result.city || ' ',
        country:result.country || ' ',
        pincode:result.pincode||0,
      }));
    }
  }, [userData, isUserSuccess]);
  useEffect(() => {
    
    if (experiencesData && experiencesData.isSuccess) {
      setUserInfo((prev) => ({ ...prev, experiences: experiencesData.result }));
    }
    if (certificatesData && certificatesData.isSuccess) {
      setUserInfo((prev) => ({ ...prev, certificates: certificatesData.result }));
    }
    if (educationData && educationData.isSuccess) {
      setUserInfo((prev) => ({
        ...prev,
        education: educationData.result as EducationModel[],
      }));
    }
  }, [ experiencesData, certificatesData, educationData]);

  const handleUpdateExperience = async (experiences: ExperienceModel[]) => {
    try {
      await Promise.all(
        experiences.map(({ experienceId, ...rest }) =>
          updateExperience({ experienceId, ...rest })
        )
      );
      setUserInfo((prev) => ({ ...prev, experiences }));
    } catch (error) {
      console.error("Failed to update experience:", error);
    }
  };

  const handleCreateCertificate = async (certificateData: FormData) => {
    try {
      const newCertificate = await createCertificate({ formData: certificateData, userId }).unwrap();
      setUserInfo((prev) => ({
        ...prev,
        certificates: [...prev.certificates, newCertificate],
      }));
      alert('Certificate created successfully!');
    } catch (error) {
      console.error('Failed to create certificate:', error);
      alert('Failed to create certificate.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <UserInfo
        username={userInfo.username}
        fullName={userInfo.fullName}
        firstName={userInfo.firstName}
        lastName={userInfo.lastName || ' '}
        bio={userInfo.bio}
        profilePicture={userInfo.profilePicture || null}  
        city={userInfo.city}
        country={userInfo.country}
        pincode={userInfo.pincode}
        followingCount={120}
        followersCount={340}
        postCount={50}
      />
      <UserExperience
        experiences={userInfo.experiences}
        onUpdate={handleUpdateExperience}
      />
      <UserEducation
        education={userInfo.education}
        refetch={refetchEducation}
        onUpdate={(updatedEducation) => setUserInfo((prev) => ({ ...prev, education: updatedEducation }))}
      />
      <UserCertificates
        certificates={userInfo.certificates}
        onCreate={handleCreateCertificate}
        loading={loadingCreateCertificate}
        refetch={refetchCertificates}
      />
      <UserPosts />
    </div>
  );
}

export default UserProfile;
