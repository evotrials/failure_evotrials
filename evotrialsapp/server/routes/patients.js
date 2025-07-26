module.exports = (patients, authenticate) => {
  const router = require('express').Router();

  // Get all patients
  router.get('/', (req, res) => {
    res.json(patients);
  });

  // Add new patient (protected)
  router.post('/', authenticate, (req, res) => {
    const { fullName, age, gender, location, medicalCondition, medications } = req.body;
    
    // Validation
    if (!fullName || !age || !gender || !location || !medicalCondition) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newPatient = {
      id: Date.now().toString(),
      fullName,
      age: parseInt(age),
      gender,
      location,
      medicalCondition,
      medications: medications || []
    };

    patients.push(newPatient);
    res.status(201).json(newPatient);
  });

  return router;
};