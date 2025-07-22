const mongoose = require('mongoose');

const JournalEntrySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        enum: ['happy', 'sad', 'neutral', 'anxious', 'angry', 'relaxed'],
        default: 'neutral'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('journalEntry', JournalEntrySchema);