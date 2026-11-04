const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const CONFIG_PATH = path.join(__dirname, 'config.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API: Submit Admission Form
app.post('/api/apply', (req, res) => {
    const { fullname, email, course } = req.body;

    if (!fullname || !email || !course) {
        return res.status(400).json({ error: 'Please fill out all required fields.' });
    }

    // Read config, add application, save config
    fs.readFile(CONFIG_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Server error reading database.' });
        
        const config = JSON.parse(data);
        
        // Check for duplicate email
        if (config.applications.some(app => app.email === email)) {
            return res.status(400).json({ error: 'An application with this email already exists.' });
        }

        config.applications.push({ 
            id: Date.now(), 
            fullname, 
            email, 
            course, 
            date: new Date().toISOString() 
        });

        fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), (writeErr) => {
            if (writeErr) return res.status(500).json({ error: 'Server error saving application.' });
            res.status(200).json({ success: true, message: 'Application submitted successfully!' });
        });
    });
});

// Custom Error Pages
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, () => {
    console.log(`🎓 Nolan Institute Server running at http://localhost:${PORT}`);
});