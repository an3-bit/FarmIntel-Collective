const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// ✅ Add your frontend's origin here
const corsOptions = {
  origin: [
    'http://localhost:8084', 
    'http://localhost:3000',
    'http://localhost:8000',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// ✅ Enable CORS for all routes
app.use(cors(corsOptions));
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL database');
});

// Import API routes
const apiRoutes = require('./src/routes/api');

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running and connected to MySQL');
});

// Use API routes
app.use('/api', apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
