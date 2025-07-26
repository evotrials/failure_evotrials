import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PatientCard from '../components/PatientCard';
import TrialCard from '../components/TrialCard';

const Match = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [matchedTrials, setMatchedTrials] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/patients`, {
          headers: {
            Authorization: `Basic ${token}`
          }
        });
        setPatients(response.data);
      } catch (error) {
        toast.error('Failed to load patients');
        console.error(error);
      }
    };

    fetchPatients();
  }, [token]);

  const handleMatch = async () => {
    if (!selectedPatient) {
      toast.error('Please select a patient');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/match`,
        { patientId: selectedPatient },
        {
          headers: {
            Authorization: `Basic ${token}`
          }
        }
      );
      
      setMatchedTrials(response.data);
      toast.success(`Found ${response.data.length} matching trials`);
    } catch (error) {
      toast.error('Failed to match trials');
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-dark mb-6">Match Patient to Trials</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Patient</label>
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
          >
            <option value="">Choose a patient</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>
                {patient.fullName} ({patient.age}, {patient.gender})
              </option>
            ))}
          </select>
        </div>
        
        <button
          onClick={handleMatch}
          className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          disabled={!selectedPatient}
        >
          Find Matching Trials
        </button>
      </div>
      
      {selectedPatient && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Patient Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patients
              .filter(p => p.id === selectedPatient)
              .map(patient => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
          </div>
        </div>
      )}
      
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Matching Clinical Trials: {matchedTrials.length}
        </h3>
        
        {matchedTrials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matchedTrials.map(trial => (
              <TrialCard key={trial.id} trial={trial} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No matching trials found</p>
        )}
      </div>
    </div>
  );
};

export default Match;