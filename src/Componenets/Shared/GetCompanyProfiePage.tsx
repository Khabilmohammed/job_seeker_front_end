import React, { useEffect, useState } from 'react';
import CompanyBanner from '../Comapany/CompanyBanner';
import CompanyAbout from '../Comapany/CompanyAbout';
import CompanyJobOpenings from '../Comapany/CompanyJobOpenings';
import ReadOnlyUserPosts from './ReadOnlyUserPosts';
import { useGetCompanyByUserIdQuery } from '../../Apis/companyApi';
import { useSelector } from 'react-redux';
import { Rootstate } from '../../Storage/Redux/store';
import { useParams } from 'react-router-dom';
import { useFollowUserMutation, useUnfollowUserMutation, useIsFollowingQuery } from '../../Apis/followApi';

const GetCompanyProfiePage: React.FC = () => {
  const { userid } = useParams();
  const followerId = useSelector((state: Rootstate) => state.userAuthStore.id); 

  // Queries to fetch company details and follow status
  const { data, isLoading, isError } = useGetCompanyByUserIdQuery(userid);
  const { data: followStatusData, isLoading: isFollowLoading } = useIsFollowingQuery({
    followerId, 
    followingId: userid!,
  });

  const [isFollowing, setIsFollowing] = useState<boolean>(false); 
  const [followCompany] = useFollowUserMutation(); 
  const [unfollowCompany] = useUnfollowUserMutation(); 

  useEffect(() => {
    if (followStatusData) {
      setIsFollowing(followStatusData.isFollowing);  // Update isFollowing state based on the API response
    }
  }, [followStatusData]);

  const handleFollowToggle = async () => {
    try {
      const safeFollowingId = userid!; 
      if (isFollowing) {
        await unfollowCompany({ followerId, followingId: safeFollowingId });
        setIsFollowing(false);
      } else {
        await followCompany({ followerId, followingId: safeFollowingId });
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Failed to toggle follow status:', error);
    }
  };

  if (isLoading || isFollowLoading) return <p>Loading company profile...</p>;
  if (isError || !data || !data.result) return <p>Failed to load company profile.</p>;

  const company = data.result;

  return (
    <div className="p-6 bg-gray-100">
      {/* Company Banner Section */}
      <div className="relative">
        <CompanyBanner
          bannerImage={company.banner|| "https://via.placeholder.com/150"}
          logoImage={company.logoUrl || "https://via.placeholder.com/50"}
          companyName={company.name || "N/A"}
          companyTagline={company.industry || "N/A"}
        />
        <div className="absolute top-4 right-4">
          <button
            className={`px-4 py-2 text-sm font-medium text-white rounded ${
              isFollowing ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            onClick={handleFollowToggle}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      </div>

      {/* Company About Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800">About the Company</h2>
        <CompanyAbout
          foundedYear={company.foundedYear || 0}
          employeeCount={company.size || "N/A"}
          specialties={company.industry || "N/A"}
          mission={company.description || "N/A"}
          link={company.website || "N/A"}
          about={company.about || "N/A"}
        />
      </div>

      {/* Company Job Openings and User Posts Section */}
      <div className="mt-8">
        <CompanyJobOpenings />
        <ReadOnlyUserPosts />
      </div>
    </div>
  );
};

export default GetCompanyProfiePage;
