import React from 'react';

const PatientCard = ({ patient }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800">{patient.fullName}</h3>
      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-600">Age:</span> {patient.age}
        </div>
        <div>
          <span className="text-gray-600">Gender:</span> {patient.gender}
        </div>
        <div className="col-span-2">
          <span className="text-gray-600">Condition:</span> {patient.medicalCondition}
        </div>
        <div className="col-span-2">
          <span className="text-gray-600">Location:</span> {patient.location}
        </div>
      </div>
    </div>
  );
};

export default PatientCard;