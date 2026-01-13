const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require('./middleware/error.middleware');
const authRoutes = require('./routes/auth.routes');

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://gigflow-frontend-pz08.onrender.com'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.options('*', cors()); // Enable preflight for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const gigRoutes = require('./routes/gig.routes');

app.use('/api/auth', authRoutes);
const bidRoutes = require('./routes/bid.routes');

app.use('/api/gigs', gigRoutes);
app.use('/api/bids', bidRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
