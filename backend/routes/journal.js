const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntry');

// @route POST api/journal
// @desc Create a journal entry
// @access Private (will add authentication later)
router.post('/', async (req, res) => {
    // For now, I'll manually assign a user ID for testing.
    // Later, this will come from an authenticated user token.
    const tempUserId = '687ef27dd832a8128d3a8f1e';

    const { title, content, mood } = req.body;

    try {
        const newEntry = new JournalEntry({
            user: tempUserId,
            title,
            content,
            mood
        });

        const entry = await newEntry.save();
        res.status(201).json(entry);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route GET api.journal
// @desc Get all journal entries for a user
// @access Private (will add authentication later)
router.get('/', async (req, res) => {
    const tempUserId = '687ef27dd832a8128d3a8f1e';

    try {
        const entries = await JournalEntry.find({ user: tempUserId }).sort({ date: -1 });
        res.json(entries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;