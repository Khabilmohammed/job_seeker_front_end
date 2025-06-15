import React from 'react';

interface ConfirmationModalProps {
  show: boolean;
  message: string;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ show, message, title, onConfirm, onCancel, confirmText = "Confirm" }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        {title && (
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        )}
        <p className="mb-6 text-gray-600 whitespace-pre-line">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
