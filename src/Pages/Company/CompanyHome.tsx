import React from 'react'
import { CreateStory, Feed, StorySection } from '../../Componenets'


function CompanyHome() {
  return (
    <>
    {/* Feed and Story Section */}
     {/* Feed and Story Section */}
     <div className="flex-1 flex flex-col overflow-y-auto bg-gray-50">
        {/* Create Story Section */}
        <div className="mb-4 p-4 bg-white shadow-sm rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Create Story</h2>
          <CreateStory refetch={() => {}} />
        </div>

        {/* Story Section */}
        <div className="mb-4 p-4 bg-white shadow-sm rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Stories</h2>
          <StorySection />
        </div>

        {/* Feed Section */}
        <div className="p-4 bg-white shadow-sm rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Your Feed</h2>
          <Feed />
        </div>
      </div>
  </>
  )
}

export default CompanyHome