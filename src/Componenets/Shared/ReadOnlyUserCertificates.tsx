import React, { useState } from 'react';
import { CertificateModel } from '../../Interfaces/CertificateModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

interface ReadOnlyUserCertificatesProps {
  certificates: CertificateModel[];
}

const ReadOnlyUserCertificates: React.FC<ReadOnlyUserCertificatesProps> = ({ certificates }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4">Certificates</h2>
      <ul className="space-y-2">
        {certificates.length > 0 ? (
          certificates.map((certificate) => (
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
              <FontAwesomeIcon icon={faEye} className="text-blue-500" />
            </li>
          ))
        ) : (
          <p className="text-gray-500">No certificates available.</p>
        )}
      </ul>

      {isImageModalOpen && selectedImageUrl && (
        <ImageModal imageUrl={selectedImageUrl} onClose={() => setIsImageModalOpen(false)} />
      )}
    </div>
  );
};

export default ReadOnlyUserCertificates;
