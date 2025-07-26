import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddTrial = () => {
  const [formData, setFormData] = useState({
    title: '',
    condition: '',
    minAge: '',
    maxAge: '',
    gender: 'Any',
    location: '',
    description: ''
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
        `${process.env.REACT_APP_API_URL}/trials`,
        formData,
        {
          headers: {
            Authorization: `Basic ${token}`
          }
        }
      );
      
      toast.success('Clinical trial added successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to add clinical trial');
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-dark mb-6">Add New Clinical Trial</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Trial Title</label>
          <input
            type="text"
            name="title"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">Disease/Condition</label>
            <input
              type="text"
              name="condition"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.condition}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Gender Requirement</label>
            <select
              name="gender"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Any">Any</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">Minimum Age</label>
            <input
              type="number"
              name="minAge"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.minAge}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Maximum Age</label>
            <input
              type="number"
              name="maxAge"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.maxAge}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
        </div>
        
        <div className="mb-4">
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
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            rows="4"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Add Clinical Trial
        </button>
      </form>
    </div>
  );
};

export default AddTrial;