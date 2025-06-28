import React, { useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import logo from "../../Assets/StaticPageImages/assets/logo.png";
import { Rootstate } from '../../Storage/Redux/store';
import { useSelector } from 'react-redux';
import { useGetUserByIdQuery } from '../../Apis/userManagementApi';
import { Link } from 'react-router-dom';

const HeaderbarCompany = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const { data: user, isLoading, isError } = useGetUserByIdQuery(userId);
  return (
    <header className="bg-[#187a43] shadow-md py-4 px-6 flex flex-col md:flex-row justify-between items-center fixed top-0  left-0 w-full z-50">
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-4 md:mb-0">
        <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
        <span className="text-white text-xl tracking-tight">Connect-X</span>
      </div>
      {/* Navigation Icons */}
      <Link
  to="/company/companyProfile"
  className="relative"
>
  <div
    onMouseEnter={() => setShowDropdown(true)}
    onMouseLeave={() => setShowDropdown(false)}
    className="flex items-center space-x-2 cursor-pointer"
  >
    {isLoading ? (
      <span className="text-white text-sm">Loading...</span>
    ) : isError ? (
      <span className="text-red-500 text-sm">Error loading user</span>
    ) : (
      <>
        <FaRegUserCircle className="text-white text-2xl hover:text-blue-400 transition-colors duration-300" />
        <span className="text-white text-xl tracking-tight font-medium">
          {user?.result.userName || "Profile"}
        </span>
      </>
    )}
  </div>

  {/* Dropdown */}
  {showDropdown && !isLoading && user && (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 text-black z-50">
      <h3 className="font-semibold text-lg">
        {user.result.firstName} {user.result.lastName}
      </h3>
      <p className="text-sm text-gray-600">Email: {user.result.email}</p>
      <p className="text-sm text-gray-600">City: {user.result.city}</p>
      <p className="text-sm text-gray-600">Country: {user.result.country}</p>
    </div>
  )}
</Link>
    </header>
  );
};

export default HeaderbarCompany;
