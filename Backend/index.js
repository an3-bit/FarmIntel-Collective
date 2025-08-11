const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for React frontend
app.use(express.json()); // Parse JSON bodies
app.use('/api', apiRoutes); // Mount API routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});