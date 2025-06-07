// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.BACKEND_PORT || 3001;

// Middlewares
app.use(cors()); // אפשר גישה ממקורות שונים
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

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});