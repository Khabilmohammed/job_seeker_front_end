import React, { useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import logo from "../../Assets/StaticPageImages/assets/logo.png";
import { useGetUserByIdQuery } from "../../Apis/userManagementApi";
import { useSelector } from "react-redux";
import { Rootstate } from "../../Storage/Redux/store";
import { useSearchJobPostsQuery } from "../../Apis/searchApi"; // Import the search API
import { Link } from "react-router-dom";

const Headerbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const { data: user, isLoading, isError } = useGetUserByIdQuery(userId);
  console.log("User Data:", user);  

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

  console.log("Search Results:", searchResults);  

  return (
    <header className="bg-[#075e54] shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img className="h-10 w-10" src={logo} alt="Logo" />
        <span className="text-white text-xl tracking-tight">Connect-X</span>
      </div>

      {/* Search Form */}
      <form
        className="flex items-center w-full max-w-[800px] mx-4 relative"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative w-full">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17.65 10.35a7.3 7.3 0 1 1-14.6 0 7.3 7.3 0 0 1 14.6 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="search"
            className="w-full pl-10 pr-4 py-3 text-sm rounded-full border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            placeholder="Search job posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
          <Link
            to="/user/userProfile"
            className="flex items-center space-x-2 cursor-pointer group"
          >
            {user?.result?.profilePicture ? (
              <img
                src={user.result.profilePicture}
                alt="User"
                className="w-8 h-8 rounded-full object-cover border-2 border-white group-hover:border-blue-400 transition-all"
              />
            ) : (
              <FaRegUserCircle className="text-white text-2xl group-hover:text-blue-400 transition-colors" />
            )}
            <span className="text-white text-xl tracking-tight font-medium">
              {user?.result.userName || "Profile"}
            </span>
          </Link>
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
  <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-white shadow-2xl rounded-2xl border border-gray-300 z-50 animate-fade-in-down">
    {isSearchLoading ? (
      <div className="text-gray-500 text-center py-6 text-base font-semibold">Searching...</div>
    ) : isSearchError ? (
      <div className="text-red-500 text-center py-6 text-base font-semibold">No results found</div>
    ) : (
      <ul className="divide-y divide-gray-100 max-h-[700px] overflow-y-auto">
        {searchResults?.map((post: any) => (
          <li
            key={post.id}
            className="px-6 py-4 hover:bg-green-50 transition-all cursor-pointer"
          >
            <a
              href={`/user/jobDetailPage/${post.jobId}`}
              className="text-lg text-gray-800 hover:text-green-700 font-semibold block"
            >
              {post.title}
            </a>
            <p className="text-sm text-gray-500">
              {post.companyName ?? "Unknown Company"} &middot; {post.location ?? "Remote"}
            </p>
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
