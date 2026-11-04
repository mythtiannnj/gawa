const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// MIDDLEWARE
// ==========================================
// Serves all static files (HTML, CSS, JS, Images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// API ROUTES
// ==========================================
// Serves the config.json data (Programs, Campuses, etc.) to the frontend
app.get('/api/data', (req, res) => {
    // Ensure the path correctly points to the root config.json
    res.sendFile(path.join(__dirname, 'config.json'));
});

// ==========================================
// ERROR HANDLING
// ==========================================
// 404 Not Found (Catches any route that doesn't match static files or API)
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// 500 Internal Server Error (Global Error Handler)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).sendFile(path.join(__dirname, 'public', '500.html'));
});

// ==========================================
// START SERVER
// ==========================================
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`🎓 Nolan Institute of Technology Server`);
    console.log(`🌐 Running at: http://localhost:${PORT}`);
    console.log(`==================================================`);
});