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

// @route GET qpi/journal/:id
// @desc Get single journal entry by ID
// @access Private (will add authentication later)
router.get('/:id', async (req, res) => {
    const tempUserId = '687ef27dd832a8128d3a8f1e';

    try {
        const entry = await JournalEntry.findOne({ _id: req.params.id, user: tempUserId });

        if (!entry) {
            return res.status(404).json({ msg: 'Journal entry not found'});
        }

        res.json(entry);

    } catch (err) {
        console.error(err.message);
        // Handle cases where the ID format is invalid
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Journal entry not found'});
        }
        res.status(500).send('Server Error')
    }
});

// @route   PUT api/journal/:id
// @desc    Update a journal entry
// @access  Private (will add authentication later)
router.put('/:id', async (req, res) => {
    const tempUserId = '687ef27dd832a8128d3a8f1e';

    const { title, content, mood } = req.body;

    // Build entry object
    const entryFields = {};
    if (title) entryFields.title = title;
    if (content) entryFields.content = content;
    if (mood) entryFields.mood = mood;

    try {
        let entry = await JournalEntry.findOne({ _id: req.params.id, user: tempUserId });

        if (!entry) {
            return res.status(404).json({ msg: 'Journal entry not found'});
        }

        // Ensure user owns the entry
        // This check will be more robust with actual authentication middleware
        if (entry.user.toString() !== tempUserId) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        entry = await JournalEntry.findOneAndUpdate(
            { _id: req.params.id },
            { $set: entryFields },
            { new: true }
        );

        res.json(entry);

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg:'Journal entry not found' });
        }
        res.status(500).send('Server Error')
    }
});

// @route   DELETE api/journal/:id
// @desc    Delete a journal entry
// @access  Private (will add authentication later)
router.delete('/:id', async (req, res) => {
    const tempUserId = '687ef27dd832a8128d3a8f1e';

    try {
        // Find the entry to ensure it belongs to the authenticated user
        const entry = await JournalEntry.findOne({ _id: req.params.id, user: tempUserId });

        if (!entry) {
            return res.status(404).json({ msg: 'Journal entry not found' });
        }

        // Ensure user owns the entry
        if (entry.user.toString() !== tempUserId) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await JournalEntry.findOneAndDelete({ _id: req.params.id }); // Using findOneAndDelete for clarity with user ID

        res.json({ msg: 'Journal entry removed' });

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Journal entry not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;