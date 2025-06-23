// strmly-backend/server.js
require('dotenv').config();
const express      = require('express');
const helmet       = require('helmet');
const rateLimiter  = require('./src/middleware/rateLimiter');
const mongoose     = require('mongoose');
const authRoutes   = require('./src/routes/auth.routes');
const videoRoutes  = require('./src/routes/video.routes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const cors = require('cors');

app.use(cors());

// Global middleware
app.use(helmet());
app.use(express.json());
app.use(rateLimiter);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port http://localhost:${PORT}`));
