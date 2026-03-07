// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

// Middlewares
app.use(helmet()); // Use helmet for security
app.use(cors({
  origin: function (origin, callback) {
    const allowlist = ['http://localhost:3000', 'https://www.omrealestate.co.il'];
    if (!origin || allowlist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
})); // Configure CORS with allowlist
app.use(express.json()); // מאפשר לשרת לקרוא JSON מגוף הבקשה - חשוב מאוד!

app.get('/api', (req, res) => {
    res.json({ message: "Welcome to the Real Estate API!" });
});

// נתיבים קיימים (למשל, לנכסים)
const propertyRoutes = require('./routes/propertyRoutes');
app.use('/api/properties', propertyRoutes);

// --- הוספת הנתיבים החדשים לטיפול בפניות ---
const inquiryRoutes = require('./routes/inquiryRoutes');
// כדי שהנתיב ב-Frontend '/api/send-inquiry' יעבוד,
// והקובץ inquiryRoutes.js יגדיר את הנתיב '/send-inquiry',
// אנחנו צריכים שה-base path כאן יהיה '/api'.
app.use('/api', inquiryRoutes); 

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
}); // 404 handler

app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}); // Centralized error handler

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
