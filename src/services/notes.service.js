const Notes = require("../models/Notes");

const createNote = async (payload) => {
    return await Notes.create(payload);
};

const getNotesByTopic = async (topicId) => {
    return await Notes.find({ topicId }).sort({ createdAt: -1 });
};

const getNoteById = async (id) => {
    return await Notes.findById(id).populate('topicId');
};

const updateNote = async (id, updateData) => {
    return await Notes.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteNote = async (id) => {
    return await Notes.findByIdAndDelete(id);
};

module.exports = {
    createNote,
    getNotesByTopic,
    getNoteById,
    updateNote,
    deleteNote
};