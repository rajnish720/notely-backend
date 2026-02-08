const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Recommended to remove accidental whitespace
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic', // Referencing itself for a tree structure
        default: null
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Using the string name of the model
    }
}, { 
    timestamps: true // Useful for tracking when topics were created
});

// Export the model correctly
const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;