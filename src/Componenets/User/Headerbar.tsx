import React, { useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import logo from "../../Assets/StaticPageImages/assets/logo.png";
import { useGetUserByIdQuery } from "../../Apis/userManagementApi";
import { useSelector } from "react-redux";
import { Rootstate } from "../../Storage/Redux/store";
import { useSearchJobPostsQuery } from "../../Apis/searchApi"; // Import the search API

const Headerbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const { data: user, isLoading, isError } = useGetUserByIdQuery(userId);

  // Debouncing Logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // Delay of 500ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Search job posts API call
  const { data: searchResults, isLoading: isSearchLoading, isError: isSearchError } = useSearchJobPostsQuery(debouncedQuery, {
    skip: !debouncedQuery, 
  });

  return (
    <header className="bg-[#1a1a1a] shadow-md py-3 px-6 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img className="h-10 w-10" src={logo} alt="Logo" />
        <span className="text-white text-xl tracking-tight">Connect-X</span>
      </div>

      {/* Search Form */}
      <form
        className="flex items-center flex-grow mx-4 max-w-[800px] relative"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative w-full">
          <label htmlFor="voice-search" className="sr-only">
            Search
          </label>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m2.1-7.65a8.55 8.55 0 1 1-17.1 0 8.55 8.55 0 0 1 17.1 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="voice-search"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg pl-10 py-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search job posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
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
            <h3 className="font-semibold text-lg">
              {user.result.firstName} {user.result.lastName}
            </h3>
            <p className="text-sm text-gray-600">Email: {user.result.email}</p>
            <p className="text-sm text-gray-600">City: {user.result.city}</p>
            <p className="text-sm text-gray-600">Country: {user.result.country}</p>
            <p className="text-sm text-gray-600">Role: {user.result.role || "User"}</p>
          </div>
        )}
      </div>

      {/* Display Search Results */}
      {debouncedQuery && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-96 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-50 mt-1">
          {isSearchLoading ? (
            <p className="text-gray-600 text-center py-2">Loading...</p>
          ) : isSearchError ? (
            <p className="text-back-100 text-center py-2">not found</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {console.log("searchResults",searchResults)}
              {searchResults?.map((post: any) => (
                <li key={post.id} className="py-2 px-4 hover:bg-gray-100">
                  <a href={`/user/jobDetailPage/${post.jobId}`} className="text-gray-900">
                    {post.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </header>
  );
};

export default Headerbar;
