import React, { useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import logo from "../../../Assets/StaticPageImages/assets/logo.png";
import { Rootstate } from '../../../Storage/Redux/store';
import { useSelector } from 'react-redux';
import { useGetUserByIdQuery } from '../../../Apis/userManagementApi';

const HeaderbarAdmin = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const { data: user, isLoading, isError } = useGetUserByIdQuery(userId);
  return (
    <header className="bg-gray-900 shadow-md py-4 px-6 flex flex-col md:flex-row justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-4 md:mb-0">
        <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
        <span className="text-white text-xl tracking-tight">Connect-X</span>
      </div>

      {/* Search Form */}
      <form className="flex items-center w-full md:max-w-md relative mb-4 md:mb-0">
        <label htmlFor="search" className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-4a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
            </svg>
          </div>
          <input
            type="text"
            id="search"
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Search..."
            required
          />
          <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="w-5 h-5 text-gray-400 hover:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 10h-4V6a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v4H1v10h18V10z"/>
            </svg>
          </button>
        </div>
      </form>

      {/* Navigation Icons */}
      <div
        className="relative"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        {isLoading ? (
          <span className="text-white text-sm">Loading...</span>
        ) : isError ? (
          <span className="text-red-500 text-sm">Error loading user</span>
        ) : (
          <div className="flex items-center space-x-2 cursor-pointer">
            <FaRegUserCircle className="text-white text-2xl hover:text-blue-400 transition-colors duration-300" />
            <span className="text-white text-xl tracking-tight font-medium">
              {user?.result.userName || "Profile"}
            </span>
          </div>
        )}

        {/* Dropdown */}
        {showDropdown && !isLoading && user && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 text-black z-50">
            <h3 className="font-semibold text-lg">{user.result.firstName} {user.result.lastName}</h3>
            <p className="text-sm text-gray-600">Email: {user.result.email}</p>
            <p className="text-sm text-gray-600">City: {user.result.city}</p>
            <p className="text-sm text-gray-600">Country: {user.result.country}</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderbarAdmin;
