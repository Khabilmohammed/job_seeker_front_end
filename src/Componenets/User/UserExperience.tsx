import React, { useState } from 'react';
import { ExperienceModel } from '../../Interfaces/ExperienceModel';
import { useCreateExperienceMutation, useDeleteExperienceMutation } from '../../Apis/experienceApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import toastNotify from '../../Taghelper/toastNotify';

interface ExperienceProps {
  experiences: ExperienceModel[];
  onUpdate: (experiences: ExperienceModel[]) => void;
}

const UserExperience: React.FC<ExperienceProps> = ({ experiences, onUpdate }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editingExperience, setEditingExperience] = useState<ExperienceModel | null>(null);
  const [newExperience, setNewExperience] = useState<ExperienceModel>({
    experienceId: experiences.length + 1,
    title: '',
    startYear: new Date().getFullYear(),
    endYear: undefined,
    isCurrent: false,
  });

  const [createExperience] = useCreateExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();
  const [errors, setErrors] = useState<{ title?: string; startYear?: string; endYear?: string }>({});

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1980 + 1 }, (_, i) => currentYear - i);

  const handleSave = async () => {
    const newErrors: { title?: string; startYear?: string; endYear?: string } = {};
    if (!newExperience.title) newErrors.title = 'Job title is required.';
    if (!newExperience.startYear) newErrors.startYear = 'Start year is required.';
    if (!newExperience.isCurrent && newExperience.endYear === undefined) newErrors.endYear = 'End year is required if not currently working.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const savedExperience = await createExperience(newExperience).unwrap();
      const updatedExperiences = editingExperience
        ? experiences.map((exp) => (exp.experienceId === editingExperience.experienceId ? savedExperience : exp))
        : [...experiences, savedExperience];

      onUpdate(updatedExperiences);
      setEditMode(false);
      setEditingExperience(null);
      setNewExperience({ experienceId: experiences.length + 1, title: '', startYear: currentYear, endYear: undefined, isCurrent: false });
      setErrors({});
    } catch (error) {
      console.error("Failed to save experience:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteExperience(id).unwrap();
      const updatedExperiences = experiences.filter((exp) => exp.experienceId !== id);
      onUpdate(updatedExperiences);
      toastNotify("Successfully deleted", "success");
    } catch (error) {
      console.error("Failed to delete experience:", error);
      toastNotify("Something went wrong with deletion", "error");
    }
  };

  const handleEdit = (experience: ExperienceModel) => {
    setEditMode(true);
    setEditingExperience(experience);
    setNewExperience({ ...experience });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4 flex justify-between items-center">Experience</h2>
        <button
          onClick={() => {
            setEditMode((prev) => !prev);
            setEditingExperience(null);
            setNewExperience({ experienceId: experiences.length + 1, title: '', startYear: currentYear, endYear: undefined, isCurrent: false });
          }}
          className="bg-[#075e54] text-white px-4 py-2 rounded-md hover:bg-[#128c7e] transition duration-300"
        >
          {editMode ? 'Cancel' : 'Add Experience'}
        </button>
      </div>
      {editMode ? (
        <div className="border-t pt-4">
          <input
            type="text"
            value={newExperience.title}
            onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
            placeholder="Job Title"
            className={`border border-gray-300 p-2 w-full mb-2 rounded-md ${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          
          <select
            value={newExperience.startYear}
            onChange={(e) => setNewExperience({ ...newExperience, startYear: Number(e.target.value) })}
            className={`border border-gray-300 p-2 w-full mb-2 rounded-md ${errors.startYear ? 'border-red-500' : ''}`}
          >
            <option value="">Select Start Year</option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {errors.startYear && <p className="text-red-500 text-sm">{errors.startYear}</p>}

          <select
            value={newExperience.isCurrent ? '' : newExperience.endYear}
            onChange={(e) => setNewExperience({ ...newExperience, endYear: e.target.value ? Number(e.target.value) : undefined })}
            disabled={newExperience.isCurrent}
            className={`border border-gray-300 p-2 w-full mb-2 rounded-md ${errors.endYear ? 'border-red-500' : ''}`}
          >
            <option value="">End Year (leave blank if current)</option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {errors.endYear && <p className="text-red-500 text-sm">{errors.endYear}</p>}

          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={newExperience.isCurrent}
              onChange={() => setNewExperience({ ...newExperience, isCurrent: !newExperience.isCurrent, endYear: undefined })}
            />
            <span className="ml-2 text-sm">Currently working here</span>
          </label>
          <div className="flex justify-end mt-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 text-white bg-green-700 rounded-md hover:bg-green-900 transition duration-200"
            >
              {editingExperience ? 'Update' : 'Save'}
            </button>
          </div>
        </div>
      ) : (
        <div className="border-t pt-4">
          <ul className="space-y-4">
            {experiences.map((experience) => (
              <li key={experience.experienceId} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                <div className="text-gray-700">
                  <strong className="block text-lg">{experience.title}</strong>
                  <span className="text-sm text-gray-500">
                    {experience.startYear}{experience.isCurrent ? " - Present" : experience.endYear ? ` - ${experience.endYear}` : ''}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDelete(experience.experienceId)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserExperience;
