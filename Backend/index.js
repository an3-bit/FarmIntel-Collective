const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = 5000;


app.use(express.json()); // Parse JSON bodies
app.use('/api', apiRoutes); 
const corsOptions = {
  origin: [
    'http://localhost:5000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});