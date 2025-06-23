import React, { useState } from 'react';
import { useCreateStoryMutation } from '../../Apis/storyApi';
import { useDispatch, useSelector } from 'react-redux';
import { Rootstate } from '../../Storage/Redux/store';
import toastNotify from '../../Taghelper/toastNotify';
import { addStory } from '../../Storage/Redux/StorySlice';

interface CreateStoryProps {
  refetch: () => void; 
}

const CreateStory: React.FC<CreateStoryProps> = ({ refetch }) => {
  const [image, setImage] = useState<File | null>(null);
  const [createStory] = useCreateStoryMutation();
  const dispatch = useDispatch();
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('userId', userId);

      try {
        setIsSubmitting(true);
        const result = await createStory(formData).unwrap();
        dispatch(addStory(result.result));
        console.log('Story created:', result);
        toastNotify("The Stroy has been Created","success")
        setImage(null);
       
      } catch (error) {
        toastNotify("The Stroy has not Created!!","error")
        console.error("Failed to create story:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-green-600 to-green-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-white mb-4">Share Your Story</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input 
          type="file" 
          onChange={(e) => setImage(e.target.files?.[0] || null)} 
          accept="image/*" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 bg-white hover:border-green-800-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-lg text-white transition duration-300 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#075e54] hover:bg-[#128c7e]'}`}
        >
          {isSubmitting ? 'Creating...' : 'Create Story'}
        </button>
      </form>
      <p className="mt-4 text-center text-white">Upload an image to share your story with friends!</p>
    </div>
  );
};

export default CreateStory;
