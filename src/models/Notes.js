const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    question: {
        type: String,
        trim: true,
    },
    answer: {
        type: String,
        trim: true
    }
}, { 
    // This automatically creates 'createdAt' and 'updatedAt' fields
    timestamps: true 
});

const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;