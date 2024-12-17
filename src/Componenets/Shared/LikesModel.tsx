import React from 'react';

interface LikesModalProps {
  isOpen: boolean;
  onClose: () => void;
  likes: { userId: string; userName: string; likeId: number; avatarUrl: string }[]; 
}

const LikesModal: React.FC<LikesModalProps> = ({ isOpen, onClose, likes }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-out">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 ease-out scale-100">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {`Liked by (${likes.length})`} {/* Display the total count */}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 transition-colors">
            Close
          </button>
        </div>

        {/* Likes List */}
        <ul className="space-y-4">
          {likes.length > 0 ? (
            likes.map((like) => (
              <li key={like.likeId} className="flex items-center space-x-4">
                {/* Profile Picture with Instagram-like Gradient */}
                <div className="relative">
                  <img
                    src={like.avatarUrl}
                    alt={like.userName}
                    className="w-12 h-12 rounded-full border-2 border-transparent"
                  />
                  <span className="absolute inset-0 w-full h-full rounded-full p-0.5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></span>
                </div>
                
                <span className="font-semibold text-gray-800 text-sm">{like.userName}</span>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500">No likes yet</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default LikesModal;
