module.exports = (patients, trials, authenticate) => {
  const router = require('express').Router();

  // Match patient to trials
  router.post('/', authenticate, (req, res) => {
    const { patientId } = req.body;
    const patient = patients.find(p => p.id === patientId);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const matchedTrials = trials.filter(trial => {
      // Age check
      if (patient.age < trial.minAge || patient.age > trial.maxAge) {
        return false;
      }
      
      // Gender check
      if (trial.gender !== 'Any' && trial.gender !== patient.gender) {
        return false;
      }
      
      // Condition check
      if (!patient.medicalCondition.toLowerCase().includes(trial.condition.toLowerCase())) {
        return false;
      }
      
      // Location check (partial match)
      if (!patient.location.toLowerCase().includes(trial.location.toLowerCase())) {
        return false;
      }
      
      return true;
    });

    res.json(matchedTrials);
  });

  return router;
};