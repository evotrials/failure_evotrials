module.exports = (trials, authenticate) => {
  const router = require('express').Router();

  // Get all trials
  router.get('/', (req, res) => {
    res.json(trials);
  });

  // Add new trial (protected)
  router.post('/', authenticate, (req, res) => {
    const { title, condition, minAge, maxAge, gender, location, description } = req.body;
    
    // Validation
    if (!title || !condition || !minAge || !maxAge || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newTrial = {
      id: Date.now().toString(),
      title,
      condition,
      minAge: parseInt(minAge),
      maxAge: parseInt(maxAge),
      gender: gender || 'Any',
      location,
      description: description || ''
    };

    trials.push(newTrial);
    res.status(201).json(newTrial);
  });

  return router;
};