import React from 'react';

const TrialCard = ({ trial }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800">{trial.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{trial.description}</p>
      
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-600">Condition:</span> {trial.condition}
        </div>
        <div>
          <span className="text-gray-600">Age:</span> {trial.minAge}-{trial.maxAge}
        </div>
        <div>
          <span className="text-gray-600">Gender:</span> {trial.gender}
        </div>
        <div>
          <span className="text-gray-600">Location:</span> {trial.location}
        </div>
      </div>
    </div>
  );
};

export default TrialCard;