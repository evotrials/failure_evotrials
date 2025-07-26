import React from 'react';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-dark mb-4">Welcome to Evotrials</h1>
        <p className="text-lg text-gray-600 mb-8">
          Smart clinical trial matching platform connecting patients with research opportunities
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl text-primary mb-4">👤</div>
            <h3 className="text-xl font-semibold mb-2">For Patients</h3>
            <p className="text-gray-600">
              Find clinical trials that match your health profile and location
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl text-primary mb-4">🧪</div>
            <h3 className="text-xl font-semibold mb-2">For Researchers</h3>
            <p className="text-gray-600">
              Register clinical trials and find eligible participants
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl text-primary mb-4">🤝</div>
            <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
            <p className="text-gray-600">
              AI-powered matching based on medical criteria and location
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;