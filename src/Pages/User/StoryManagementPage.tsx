import React from 'react'
import { CreateStory } from '../../Componenets'
import OwnStory from '../../Componenets/Shared/OwnStory'
import ArchviedStory from '../../Componenets/Shared/ArchviedStory'

function StoryManagementPage() {
  return (
    <>
      <div className="mb-4 p-4 bg-white shadow-sm rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Manage Your Stories</h2>
        <CreateStory />
      </div>
      <div className="mb-4 p-4 bg-white shadow-sm rounded-lg">
        <OwnStory />
      </div>
      <div className="mb-4 p-4 bg-white shadow-sm rounded-lg">
        <ArchviedStory/>
      </div>
    </>
  )
}

export default StoryManagementPage