import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddPatient = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    location: '',
    medicalCondition: '',
    medications: ''
  });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/patients`,
        formData,
        {
          headers: {
            Authorization: `Basic ${token}`
          }
        }
      );
      
      toast.success('Patient added successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to add patient');
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-dark mb-6">Add New Patient</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Age</label>
            <input
              type="number"
              name="age"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.age}
              onChange={handleChange}
              required
              min="1"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">Gender</label>
            <select
              name="gender"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Location</label>
            <input
              type="text"
              name="location"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Medical Condition</label>
          <input
            type="text"
            name="medicalCondition"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.medicalCondition}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Medications (comma separated)</label>
          <input
            type="text"
            name="medications"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.medications}
            onChange={handleChange}
            placeholder="e.g., Aspirin, Metformin"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Add Patient
        </button>
      </form>
    </div>
  );
};

export default AddPatient;