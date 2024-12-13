import React, { useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import logo from "../../Assets/StaticPageImages/assets/logo.png";
import { Rootstate } from '../../Storage/Redux/store';
import { useSelector } from 'react-redux';
import { useGetUserByIdQuery } from '../../Apis/userManagementApi';

const HeaderbarCompany = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const { data: user, isLoading, isError } = useGetUserByIdQuery(userId);
  return (
    <header className="bg-[#745858] shadow-md py-4 px-6 flex flex-col md:flex-row justify-between items-center fixed top-0  left-0 w-full z-50">
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-4 md:mb-0">
        <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
        <span className="text-white text-xl tracking-tight">Connect-X</span>
      </div>

      {/* Search Form */}
      <form className="flex items-center w-full md:max-w-[800px] relative mb-4 md:mb-0">
        <label htmlFor="voice-search" className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"/>
            </svg>
          </div>
          <input
            type="text"
            id="voice-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos, Design Templates..."
            required
          />
          <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"/>
            </svg>
          </button>
        </div>
        <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
          Search
        </button>
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

export default HeaderbarCompany;
