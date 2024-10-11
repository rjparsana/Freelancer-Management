const express = require('express');
const Project = require('../models/projectModel');
const authMiddleware = require('../middleware/authMiddleware');
const { Parser } = require('json2csv');
const fs = require('fs');
const csv = require('csv-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Create Project
router.post('/', authMiddleware, async (req, res) => {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
});

// Get All Projects
router.get('/', authMiddleware, async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

// Export Projects to CSV
router.get('/export', authMiddleware, async (req, res) => {
    const projects = await Project.find();
    const json2csvParser = new Parser();
    const csvData = json2csvParser.parse(projects);
    res.header('Content-Type', 'text/csv');
    res.attachment('projects.csv');
    res.send(csvData);
});

// Import Projects from CSV
router.post('/import', upload.single('file'), async (req, res) => {
    const results = [];

    // Check if file is uploaded
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Read the uploaded file
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (row) => {
            // Add each row to results array
            results.push(row);
        })
        .on('end', async () => {
            try {
                // Insert all parsed data into the database
                await Project.insertMany(results);
                res.status(200).json({ message: 'Projects successfully imported' });
            } catch (error) {
                res.status(500).json({ error: 'Error importing projects' });
            }
        });
});


module.exports = router;
