import React, { useState, useEffect } from 'react';
import { EducationModel } from '../../Interfaces/EducationModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useDeleteEducationMutation, useCreateEducationMutation } from '../../Apis/educationApi';
import ConfirmationModal from '../Shared/ConfirmationModal';
import { useSelector } from 'react-redux';
import { Rootstate } from '../../Storage/Redux/store';
import toastNotify from '../../Taghelper/toastNotify';

interface EducationProps {
  education: EducationModel[];
  refetch: () => void;
  onUpdate: (updatedEducation: EducationModel[]) => void;
}

const UserEducation: React.FC<EducationProps> = ({ education, onUpdate, refetch }) => {
  const userId = useSelector((state: Rootstate) => state.userAuthStore.id);
  const [newEducation, setNewEducation] = useState<EducationModel[]>(education);
  const [showModal, setShowModal] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<number | null>(null);
  const [showInputFields, setShowInputFields] = useState(false);

  const [degree, setDegree] = useState<string>('');
  const [institution, setInstitution] = useState<string>('');
  const [fieldOfStudy, setFieldOfStudy] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const [deleteEducation] = useDeleteEducationMutation();
  const [createEducation] = useCreateEducationMutation();

  const handleRemoveEntry = async () => {
    if (entryToDelete !== null) {
      try {
        const entryId = newEducation[entryToDelete].educationId;
        await deleteEducation(entryId);
        const updatedEducation = newEducation.filter((_, i) => i !== entryToDelete);
        setNewEducation(updatedEducation);
        onUpdate(updatedEducation);
        setShowModal(false);
        setEntryToDelete(null);
        toastNotify("deleted", "info");
      } catch (error) {
        console.error("Failed to remove education entry:", error);
        toastNotify("Failed to remove education entry", "error");
      }
    }
  };

  useEffect(() => {
    setNewEducation(education);
  }, [education]);

  const handleAddEducation = async () => {
    // Validation
    if (!degree || !institution || !startDate || !endDate) {
      toastNotify("Please fill in all fields", "error");
      return;
    }

    const newEntry: EducationModel = {
      degree,
      institution,
      fieldOfStudy,
      startDate,
      endDate,
    };

    try {
      await createEducation({ formData: newEntry, userId }).unwrap();
      toastNotify("Education is added", "success");
      refetch();
    } catch (error) {
      console.error("Failed to create education:", error);
      toastNotify("Something went wrong", "error");
    }
    setDegree('');
    setInstitution('');
    setFieldOfStudy('');
    setStartDate('');
    setEndDate('');
    setShowInputFields(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold">Education</h2>
    <button
      onClick={() => setShowInputFields(!showInputFields)}
      className="px-4 py-2 text-white bg-[#075e54] rounded hover:bg-[#128c7e]"
    >
      {showInputFields ? 'Cancel' : 'Add New Education'}
    </button>
  </div>

      {/* New Education Input Fields */}
      {showInputFields && (
        <div className="mb-4 border p-4 rounded-lg shadow-sm bg-gray-50">
          <label className="block mb-1">Degree</label>
          <input
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            placeholder="Degree"
            className="border border-gray-300 p-2 w-full mb-2 rounded"
          />
          <label className="block mb-1">Institution</label>
          <input
            type="text"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            placeholder="Institution"
            className="border border-gray-300 p-2 w-full mb-2 rounded"
          />
          <label className="block mb-1">Field of Study</label>
          <input
            type="text"
            value={fieldOfStudy}
            onChange={(e) => setFieldOfStudy(e.target.value)}
            placeholder="Field of Study"
            className="border border-gray-300 p-2 w-full mb-2 rounded"
          />
          <label className="block mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 p-2 w-full mb-2 rounded"
          />
          <label className="block mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 p-2 w-full mb-2 rounded"
          />
          <button
            onClick={handleAddEducation}
            className="px-4 py-2 text-white bg-[#075e54] rounded hover:bg-[#128c7e]"
          >
            Add Education
          </button>
        </div>
      )}

      <div>
        {newEducation.map((entry, index) => (
          <div key={entry.educationId} className="mb-2 border p-4 rounded-lg shadow-sm bg-gray-50">
            <p className="font-semibold">{entry.degree}</p>
            <p className="text-gray-600">{entry.institution} ({entry.startDate})</p>
            <p className="text-gray-600">Field of Study: {entry.fieldOfStudy}</p>
            <p className="text-gray-600">From: {new Date(entry.startDate).toLocaleDateString()} To: {new Date(entry.endDate).toLocaleDateString()}</p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setEntryToDelete(index);
                  setShowModal(true);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faTrashAlt} className="mr-1" />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <ConfirmationModal
        show={showModal}
        title="Delete Education Entry"
        message="Are you sure you want to delete this education entry?"
        onConfirm={handleRemoveEntry}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default UserEducation;
