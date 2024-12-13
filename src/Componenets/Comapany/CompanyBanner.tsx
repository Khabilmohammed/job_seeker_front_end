import React from 'react';

interface CompanyBannerProps {
  bannerImage: string;
  logoImage: string;
  companyName: string;
  companyTagline: string;
}

const CompanyBanner: React.FC<CompanyBannerProps> = ({ bannerImage, logoImage, companyName, companyTagline }) => {
  return (
    <div className="relative">
      <img src={bannerImage} alt="Company Banner" className="w-full h-60 object-cover rounded-md" />
      <div className="absolute top-4 left-4 flex items-center">
        <img
          src={logoImage}
          alt="Company Logo"
          className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
        />
        <div className="ml-4 text-white font-bold">
          <h1 className="text-3xl">{companyName}</h1>
          <p className="text-lg">{companyTagline}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyBanner;
