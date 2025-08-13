const express = require('express');
<<<<<<< HEAD
const dotenv = require('dotenv');
const { connectDB } = require('./src/config/db');
const adviceRoutes = require('./src/routes/adviceRoutes');

dotenv.config();
=======
const cors = require('cors');
const apiRoutes = require('./routes/api');
>>>>>>> d42d0ca22c2eba08a4c6e649b4eba4779ff886a4

const app = express();
const PORT = 3000;


app.use(express.json()); // Parse JSON bodies
app.use('/api', apiRoutes); 
const corsOptions = {
  origin: [
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});