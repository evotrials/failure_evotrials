const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory data stores
let patients = [];
let trials = [];

// Auth middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || authHeader !== 'Basic YWRtaW5AZXZvdHJpYWxzLmNvbTpldm9hZG1pbjEyMw==') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

// Routes
app.use('/api/patients', require('./routes/patients')(patients, authenticate));
app.use('/api/trials', require('./routes/trials')(trials, authenticate));
app.use('/api/match', require('./routes/match')(patients, trials, authenticate));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));