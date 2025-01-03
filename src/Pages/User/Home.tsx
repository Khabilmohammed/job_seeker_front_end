import React, { useState } from 'react'
import {  Feed, StorySection } from '../../Componenets'

function Home() {
  return (
    <>
     <div className="flex-1 flex flex-col overflow-y-auto bg-gray-50">
        {/* Story Section */}
        <div className="mb-4 p-4 bg-white shadow-sm rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Stories</h2>
          <StorySection />
        </div>

        {/* Feed Section */}
        <div className="p-3 bg-white shadow-sm rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Your Feed</h2>
          <Feed />
        </div>
      </div>
  </>
  )
}

export default Home