import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rootstate } from '../../Storage/Redux/store'; 
import { useDeleteStoryMutation, useGetArchivedStoriesQuery } from '../../Apis/storyApi';
import { Story as StoryType } from '../../Interfaces/Story'; 
import StoryModal from './StoryModel';
import { fetchStoriesFailure, fetchStoriesSuccess } from '../../Storage/Redux/StorySlice';

const ArchviedStory: React.FC = () => {
  const dispatch = useDispatch();
  
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const { data: userStoriesData, error, isLoading, refetch } = useGetArchivedStoriesQuery(userId);
  const [deleteStory] = useDeleteStoryMutation(); // Hook for delete mutation
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number | null>(null);
  const [showOptionsIndex, setShowOptionsIndex] = useState<number | null>(null); // State to track which options are shown

  useEffect(() => {
    if (userStoriesData && userStoriesData.isSuccess) {
      dispatch(fetchStoriesSuccess(userStoriesData.result));
    } else if (error) {
      dispatch(fetchStoriesFailure("Failed to fetch user stories"));
    }
  }, [dispatch, userStoriesData, error]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching stories</div>;

  const closeModal = () => setCurrentStoryIndex(null);

  const showNextStory = () => {
    if (currentStoryIndex !== null && currentStoryIndex < userStoriesData.result.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    }
  };

  const showPreviousStory = () => {
    if (currentStoryIndex !== null && currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  const handleDeleteStory = async (storyId: number) => {
    try {
      await deleteStory(storyId).unwrap(); // Call delete mutation
      console.log(`Deleted story with ID: ${storyId}`);
      refetch();
    } catch (error) {
      console.error("Failed to delete story: ", error);
    }
  };


  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Archived Stories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {userStoriesData?.result?.length > 0 ? (
          userStoriesData.result.map((story: StoryType, index: number) => (
            <div
              key={story.storyId}
              className="relative bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden transform hover:scale-105"
              onClick={() => setCurrentStoryIndex(index)}
            >
              <img
                src={story.imageUrl}
                alt={story.userName}
                className="w-full h-40 lg:h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-2">
                <p className="text-white font-medium text-sm">{story.userName}</p>
              </div>

              {/* Options Button */}
              <div
                className="absolute top-2 right-2 group" // Added group class for hover effect
              >
                <button
                  className="text-white hover:text-gray-200 p-2 bg-transparent rounded-full transition duration-300"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click from firing
                    setShowOptionsIndex(showOptionsIndex === index ? null : index); // Toggle options
                  }}
                >
                  <span className="text-2xl">&#x22EE;</span> {/* 3 vertical dots */}
                </button>

                {/* Dropdown Menu */}
                {showOptionsIndex === index && (
                  <div className="absolute top-10 right-0 bg-white shadow-md rounded-md">
                    <ul className="py-1">
                      <li
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          handleDeleteStory(story.storyId);
                          setShowOptionsIndex(null); // Close options after action
                        }}
                      >
                        Delete
                      </li>
                      {/* Add more options here if needed */}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No active stories available.</p>
        )}
      </div>

      {currentStoryIndex !== null && userStoriesData.result[currentStoryIndex] && (
        <StoryModal
          story={userStoriesData.result[currentStoryIndex]}
          onClose={closeModal}
          onNext={showNextStory}
          onPrevious={showPreviousStory}
        />
      )}
    </div>
  );
};

export default ArchviedStory;
