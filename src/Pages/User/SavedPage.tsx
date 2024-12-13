import React from 'react'
import SavedPost from '../../Componenets/Shared/SavedPost';


function SavedPage() {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-gray-50">
     <h1>My Saved Posts</h1>
     <SavedPost/>
    </div>
  )
}

export default SavedPage;