import React, { useState } from 'react';
import CompanyBanner from '../../Componenets/Comapany/CompanyBanner';
import CompanyAbout from '../../Componenets/Comapany/CompanyAbout';
import CompanyJobOpenings from '../../Componenets/Comapany/CompanyJobOpenings';
import UserPosts from '../../Componenets/Shared/UserPosts';
import { useSelector } from 'react-redux';
import { Rootstate } from '../../Storage/Redux/store';
import { useGetCompanyByUserIdQuery } from '../../Apis/companyApi';
import EditCompanyAboutModal from '../../Componenets/Comapany/EditCompanyAboutModal';
import { BsPencilSquare } from 'react-icons/bs';

const CompanyProfile: React.FC = () => {
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const [showEditAbout, setShowEditAbout] = useState(false);
  const [showEditBanner, setShowEditBanner] = useState(false);
  const { data, isLoading, isError } = useGetCompanyByUserIdQuery(userId);

  if (isLoading) return <p>Loading company profile...</p>;
  if (isError || !data || !data.result) return <p>Failed to load company profile.</p>;
  
  const company = data.result;
  console.log("company", company);

  return (
    <div className="p-6 bg-gray-100">
      {/* Company Banner Section */}
      <div className="relative">
        <CompanyBanner
          bannerImage={company.banner || "https://via.placeholder.com/150"}
          logoImage={company.logoUrl || "https://via.placeholder.com/50"}
          companyName={company.name || "N/A"}
          companyTagline={company.industry || "N/A"}
        />
        
      </div>

      {/* Company About Section */}
      <div className="mt-8 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">About the Company</h2>
          {/* Edit About Button */}
          <button
            onClick={() => setShowEditAbout(true)}
            className="bg-green-600 text-white px-3 py-1 rounded-full flex items-center shadow-lg hover:bg-green-700"
          >
            <BsPencilSquare className="h-5 w-5 mr-1" />
            Edit About
          </button>
        </div>
        <CompanyAbout
          foundedYear={company.foundedYear || 0}
          employeeCount={company.size || "N/A"}
          specialties={company.industry || "N/A"}
          mission={company.description || "N/A"}
          link={company.website || "N/A"}
          about={company.about||"N/a"}
        />
      </div>

      {/* Company Job Openings and User Posts Section */}
      <div className="mt-8">
        <CompanyJobOpenings />
        <UserPosts />
      </div>

      {/* Modals */}
      {showEditAbout && (
        <EditCompanyAboutModal company={company} onClose={() => setShowEditAbout(false)} />
      )}
      
    </div>
  );
};

export default CompanyProfile;
