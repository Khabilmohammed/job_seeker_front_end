import React from 'react';

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  comments: { userName: string; content: string; timestamp: string; }[] | null; 
  loading: boolean; 
  error: boolean; 
}

const CommentsModal: React.FC<CommentsModalProps> = ({ isOpen, onClose, comments, loading, error }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50'>
      <div className='bg-white rounded-lg shadow-lg max-w-lg w-full'>
        <div className='p-4 border-b'>
          <h3 className='text-lg font-semibold text-gray-800'>Comments</h3>
          <button onClick={onClose} className='text-red-500 float-right font-bold hover:underline'>Close</button>
        </div>
        <div className='p-4'>
          {loading ? (
            <div className='flex items-center justify-center'>
              <div className='loader' /> {/* Add a loader spinner here */}
              <p className='ml-2 text-gray-500'>Loading comments...</p>
            </div>
          ) : error ? (
            <p className='text-red-500'>Error loading comments.</p>
          ) : comments && comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className='border-b py-2'>
                <strong className='text-gray-800'>{comment.userName}</strong>
                <p className='text-gray-600'>{comment.content}</p>
                <p className='text-xs text-gray-500'>{new Date(comment.timestamp).toLocaleString()}</p> {/* Display the timestamp */}
              </div>
            ))
          ) : (
            <p className='text-gray-500'>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
