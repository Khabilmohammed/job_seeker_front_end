import React, { useState } from 'react';
import { CertificateModel } from '../../Interfaces/CertificateModel';
import { useDeleteCertificateMutation } from '../../Apis/certificateApi';
import { useSelector } from 'react-redux';
import { Rootstate } from '../../Storage/Redux/store';
import ConfirmationModal from '../Shared/ConfirmationModal'; // Adjust path as necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface CertificatesProps {
  certificates: CertificateModel[];
  onCreate: (certificateData: FormData) => Promise<void>;
  loading: boolean;
  refetch: () => void;
}

const UserCertificates: React.FC<CertificatesProps> = ({ certificates, onCreate, loading,refetch }) => {
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [certificateName, setCertificateName] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [issueDate, setIssueDate] = useState<string>('');
  const [issuer, setIssuer] = useState<string>('');
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [deleteCertificate, { isLoading: isDeleting }] = useDeleteCertificateMutation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedCertificateId, setSelectedCertificateId] = useState<number | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', certificateName);
    if (image) {
      formData.append('image', image);
    }
    formData.append('issueDate', issueDate);
    formData.append('expirationDate', expirationDate);
    formData.append('issuer', issuer);

    await onCreate(formData);
    refetch();
    setCertificateName('');
    setExpirationDate(''); 
    setImage(null);
    setIssueDate('');
    
    setIssuer('');
    setIsEditing(false);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setIsImageModalOpen(true);
  };

  const ImageModal: React.FC<{ imageUrl: string; onClose: () => void }> = ({ imageUrl, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-4">
          <button onClick={onClose} className="text-red-500 mb-2">Close</button>
          <img src={imageUrl} alt="Enlarged Certificate" className="max-w-full max-h-screen" />
        </div>
      </div>
    );
  };
  const handleDeleteClick = (certificateId: number) => {
    setSelectedCertificateId(certificateId);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedCertificateId !== null) {
      try {
        await deleteCertificate({ id: selectedCertificateId, userId });
        refetch();
      } catch (error) {
        console.error('Failed to delete certificate:', error);
      } finally {
        setShowModal(false);
        setSelectedCertificateId(null);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
    <h2 className="mb-4 flex justify-between items-center">
      <span className="text-xl font-bold">Certificates</span>
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="px-4 py-2 text-white bg-[#075e54] rounded hover:bg-[#128c7e]"
      >
        {isEditing ? 'Cancel' : 'Add Certificate'}
      </button>
    </h2>

    <ul className="space-y-2">
      {certificates.map((certificate) => (
        <li key={certificate.certificateId} className="flex justify-between items-center border-b pb-2 mb-2">
          <div className="flex items-start space-x-4">
            <img
              src={certificate.imageUrl}
              alt={certificate.name}
              className="w-16 h-16 object-cover rounded cursor-pointer"
              onClick={() => handleImageClick(certificate.imageUrl)}
            />
            <div className="flex flex-col">
              <span className="font-semibold">{certificate.name}</span>
              {certificate.issuer && <span className="text-gray-600">{certificate.issuer}</span>}
              {certificate.issueDate && <span className="text-gray-500">Issued: {new Date(certificate.issueDate).toLocaleDateString()}</span>}
              {certificate.expirationDate && (
                <span className="text-gray-500">
                  Expires: {new Date(certificate.expirationDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => handleDeleteClick(certificate.certificateId)}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-800 p-1"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </li>
      ))}
    </ul>

    {isEditing && (
      <form onSubmit={handleSubmit} className="flex flex-col mt-4">
        <input
          type="text"
          value={certificateName}
          onChange={(e) => setCertificateName(e.target.value)}
          placeholder="Enter Certificate Name"
          required
          className="border border-gray-300 p-2 mb-2 rounded"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          accept="image/*"
          required
          className="mb-2"
        />
        <input
          type="text"
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
          placeholder="Enter Issuer Name"
          className="border border-gray-300 p-2 mb-2 rounded"
        />
        <label className="mb-1">Issue Date:</label>
        <input
          type="date"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          className="border border-gray-300 p-2 mb-2 rounded"
        />
        <label className="mb-1">Expiration Date:</label>
        <input
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className="border border-gray-300 p-2 mb-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 text-white ${loading ? 'bg-gray-400' : 'bg-blue-500'} rounded hover:bg-blue-600`}
        >
          {loading ? 'Creating...' : 'Create Certificate'}
        </button>
      </form>
    )}

     {showModal && (
        <ConfirmationModal
          show={showModal}
          title="Delete Certificate"
          message="Are you sure you want to delete this certificate?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}

      {isImageModalOpen && selectedImageUrl && (
        <ImageModal imageUrl={selectedImageUrl} onClose={() => setIsImageModalOpen(false)} />
      )}
  </div>
  );
};

export default UserCertificates;
