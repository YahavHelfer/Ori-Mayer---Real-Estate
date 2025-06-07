// backend/routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const { fetchAndProcessProperties } = require('../services/crmService');

let cachedProperties = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 30 * 60 * 1000; // 30 דקות

async function getProperties(req, res, next) {
    const now = Date.now();
    if (cachedProperties && (now - lastFetchTime < CACHE_DURATION_MS)) {
        console.log("Serving properties from cache.");
        req.properties = cachedProperties;
        return next();
    }

    try {
        console.log("Fetching fresh properties from CRM...");
        cachedProperties = await fetchAndProcessProperties();
        lastFetchTime = now;
        req.properties = cachedProperties;
        console.log(`Successfully fetched and cached ${cachedProperties.length} properties.`);
        next();
    } catch (error) {
        console.error('Failed to get properties:', error);
        // אם המטמון עדיין קיים ויש שגיאה במשיכה חדשה, אפשר להחזיר את המטמון הישן
        if (cachedProperties) {
            console.warn("Serving stale cache due to fetch error.");
            req.properties = cachedProperties;
            return next();
        }
        res.status(500).json({ message: "Failed to fetch properties from CRM", error: error.message });
    }
}

// Middleware לכל הנתיבים בראוטר הזה
router.use(getProperties);


//  >>> הוספת נתיב חדש <<<
// GET /api/properties/all-ids
// מחזיר רשימה פשוטה של כל ה-ID-ים של הנכסים
router.get('/all-ids', (req, res) => {
    // req.properties מגיע מה-middleware getProperties שכבר כתבנו
    const allIds = req.properties.map(p => p.id);
    res.json(allIds);
});
//  >>> סוף הוספת נתיב חדש <<<

// נתיב לקבלת כל הנכסים (הזמינים)
router.get('/', (req, res) => {
    const availableProperties = req.properties.filter(p => !p.isSoldOrRented);
    res.json(availableProperties);
});

// נתיב לנכסים להשכרה (זמינים)
router.get('/rent', (req, res) => {
    const rentalProperties = req.properties.filter(p =>
        !p.isSoldOrRented && p.transactionType && p.transactionType.toLowerCase().includes('שכרה') // השכרה או להשכרה
    );
    res.json(rentalProperties);
});

// נתיב לנכסים למכירה (זמינים)
router.get('/sale', (req, res) => {
    const saleProperties = req.properties.filter(p =>
        !p.isSoldOrRented && p.transactionType && p.transactionType.toLowerCase().includes('מכירה')
    );
    res.json(saleProperties);
});

// נתיב לנכסים שנמכרו או הושכרו
router.get('/sold', (req, res) => {
    const soldOrRentedProperties = req.properties.filter(p => p.isSoldOrRented);
    res.json(soldOrRentedProperties);
});

// נתיב לנכס ספציפי לפי ID
router.get('/:id', (req, res) => {
    const property = req.properties.find(p => String(p.id) === String(req.params.id));
    if (property) {
        res.json(property);
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
});

module.exports = router;