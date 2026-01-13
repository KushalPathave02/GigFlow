const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/error.middleware');
const authRoutes = require('./routes/auth.routes');
const gigRoutes = require('./routes/gig.routes');
const bidRoutes = require('./routes/bid.routes');

dotenv.config();
connectDB();

const app = express();

// 1. CORS Middleware (MUST BE FIRST)
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://gigflow-frontend-pz08.onrender.com',
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
  })
);

// 2. Preflight Requests Handler
app.options('*', cors());

// 3. Body Parsers and Cookie Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 4. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/bids', bidRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// 5. Error Handling Middleware (MUST BE LAST)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
