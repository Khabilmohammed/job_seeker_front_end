import React from 'react';
import { ExperienceModel } from '../../Interfaces/ExperienceModel';

interface ReadonlyExperienceProps {
  experiences: ExperienceModel[];
}

const ReadonlyUserExperience: React.FC<ReadonlyExperienceProps> = ({ experiences }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Experience</h2>
      {experiences.length === 0 ? (
        <p className="text-gray-500">No experiences added yet.</p>
      ) : (
        <div className="border-t pt-4">
          <ul className="space-y-4">
            {experiences.map((experience) => (
              <li
                key={experience.experienceId}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
              >
                <div className="text-gray-700">
                  <strong className="block text-lg">{experience.title}</strong>
                  <span className="text-sm text-gray-500">
                    {experience.startYear}
                    {experience.isCurrent
                      ? ' - Present'
                      : experience.endYear
                      ? ` - ${experience.endYear}`
                      : ''}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReadonlyUserExperience;
