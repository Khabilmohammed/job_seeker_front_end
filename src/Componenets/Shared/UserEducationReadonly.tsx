import React, { useState, useEffect } from 'react';
import { EducationModel } from '../../Interfaces/EducationModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from '../Shared/ConfirmationModal';

interface EducationProps {
  education: EducationModel[];
}

const UserEducationReadonly: React.FC<EducationProps> = ({ education }) => {
  const [viewEducation, setViewEducation] = useState<EducationModel[]>(education);

  useEffect(() => {
    setViewEducation(education);
  }, [education]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">Education</h2>

      <div>
        {viewEducation.map((entry) => (
          <div key={entry.educationId} className="mb-2 border p-4 rounded-lg shadow-sm bg-gray-50">
            <p className="font-semibold">{entry.degree}</p>
            <p className="text-gray-600">{entry.institution} ({entry.startDate})</p>
            <p className="text-gray-600">Field of Study: {entry.fieldOfStudy}</p>
            <p className="text-gray-600">
              From: {new Date(entry.startDate).toLocaleDateString()} 
              To: {new Date(entry.endDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserEducationReadonly;
