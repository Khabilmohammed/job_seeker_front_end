import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rootstate } from '../../Storage/Redux/store';
import { useGetStoriesByUserIdQuery, useGetStoriesFromOthersQuery } from '../../Apis/storyApi';
import {  fetchStoriesFailure, setStories } from '../../Storage/Redux/StorySlice';
import CoverImage from '../../Assets/Images/Leonardo_Phoenix_A_sleek_modern_laptop_sits_centered_on_a_mini_3.jpg';
import { Story as StoryInterface } from '../../Interfaces/Story';
import StoryModal from '../Shared/StoryModel';

const StorySection: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const { data: userStoriesData, error: userStoriesError } = useGetStoriesByUserIdQuery(userId);
  const { data: otherStoriesData, error: otherStoriesError } = useGetStoriesFromOthersQuery(userId);
  const stories: StoryInterface[] = useSelector((state: Rootstate) => state.storyStore.stories);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  
  const [selectedStory, setSelectedStory] = useState<StoryInterface | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  
  // Fetch user and other stories on component mount
  useEffect(() => {
    if (userStoriesData && userStoriesData.isSuccess) {
      dispatch(setStories(userStoriesData.result));
    } else if (userStoriesError) {
      dispatch(fetchStoriesFailure("Failed to fetch user stories"));
    }

    if (otherStoriesData && otherStoriesData.isSuccess) {
      dispatch(setStories(otherStoriesData.result));
    } else if (otherStoriesError) {
      dispatch(fetchStoriesFailure("Failed to fetch stories from others"));
    }
  }, [dispatch, userStoriesData, userStoriesError, otherStoriesData, otherStoriesError]);
  
  if (!Array.isArray(stories)) {
    return <div>Error: Stories is not an array</div>;
  }

  // Group stories by userId
  const groupedStories = stories.reduce((acc: { [key: string]: StoryInterface[] }, story) => {
    const userId = story.userId;
    if (!acc[userId]) {
      acc[userId] = [];
    }
    acc[userId].push(story);
    return acc;
  }, {});

  // Function to open the story modal
  const handleStoryClick = (userStories: StoryInterface[], userId: string) => {
    setSelectedUserId(userId);
    setCurrentStoryIndex(0);
    setSelectedStory(userStories[0]);
  };

  // Navigate to the next story in the current user's stories
  const handleNextStory = () => {
    if (selectedUserId && groupedStories[selectedUserId]) {
      const userStories = groupedStories[selectedUserId];
      const nextStoryIndex = (currentStoryIndex + 1) % userStories.length;
      setCurrentStoryIndex(nextStoryIndex);
      setSelectedStory(userStories[nextStoryIndex]);
    }
  };

  // Navigate to the previous story
  const handlePreviousStory = () => {
    if (selectedUserId && groupedStories[selectedUserId]) {
      const userStories = groupedStories[selectedUserId];
      const previousStoryIndex = (currentStoryIndex - 1 + userStories.length) % userStories.length;
      setCurrentStoryIndex(previousStoryIndex);
      setSelectedStory(userStories[previousStoryIndex]);
    }
  };

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollBy({
        left: -containerWidth,
        behavior: 'smooth',
      });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollBy({
        left: containerWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative w-full bg-gray-100 border-t border-gray-300 p-2">
      <div ref={scrollContainerRef} className="flex overflow-x-auto space-x-4 p-2 scrollbar-hide">
        {/* Display all users' stories including own */}
        {Object.entries(groupedStories).map(([userId, userStories]) => (
          <div key={userId} className="flex flex-col items-center flex-shrink-0 w-24" onClick={() => handleStoryClick(userStories, userId)}>
            <div className="relative group">
              <div className="relative">
                <img
                  src={userStories[0].imageUrl || CoverImage}
                  alt={userStories[0].userName}
                  className="w-18 h-18 rounded-full border-4 border-blue-500 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {userStories.length > 1 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    +{userStories.length}
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm mt-2 text-center font-semibold text-gray-700">
              {userStories[0].userName}
            </p>
          </div>
        ))}
      </div>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"
      >
        ←
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"
      >
        →
      </button>

      {/* Story Modal */}
      {selectedStory && (
        <StoryModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
          onNext={handleNextStory}
          onPrevious={handlePreviousStory}
        />
      )}
    </div>
  );
};

export default StorySection;
