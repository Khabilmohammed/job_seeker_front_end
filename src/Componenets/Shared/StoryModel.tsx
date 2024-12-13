import React from 'react';
import { Story } from '../../Interfaces/Story';

interface StoryModalProps {
  story: Story;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ story, onClose, onNext, onPrevious }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="relative bg-white p-4 rounded-lg">
        <button onClick={onClose} className="absolute top-0 right-0 p-2 text-red-500">X</button>
        <img src={story.imageUrl} alt={story.userName} className="max-w-full max-h-full" />
        <div className="flex justify-between mt-4">
          <button onClick={onPrevious} className="p-2 bg-gray-200 rounded">← Previous</button>
          <button onClick={onNext} className="p-2 bg-gray-200 rounded">Next →</button>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
