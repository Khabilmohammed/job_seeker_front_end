import React from 'react';

interface CompanyAboutProps {
  foundedYear?: number;
  employeeCount?: string;
  specialties?: string;
  mission?: string;
  link?:String;
  about:string;
}

const CompanyAbout: React.FC<CompanyAboutProps> = ({ foundedYear, employeeCount, specialties, mission, link,about }) => {
  return (
    <div className="mt-8 bg-white p-6 rounded-md shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">About Us</h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
      {about}
      </p>
      <div className="flex flex-wrap justify-between">
        <div className="text-sm space-y-2">
          <p><strong>Founded:</strong> {foundedYear}</p>
          <p><strong>Employees:</strong> {employeeCount}</p>
          <p><strong>Specialties:</strong> {specialties}</p>
        </div>
        <div className="text-sm space-y-2">
          <p><strong>Mission:</strong> {mission}</p>
          <p><strong>Website:</strong> {link}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyAbout;
