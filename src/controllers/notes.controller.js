const notesService = require("../services/notes.service");
const { writeResponse } = require("../utils/common");

const createNote = async (req, res) => {
    const { topicId, question, answer } = req.body;

    if (!topicId || !question || !answer) {
        return writeResponse(res, 400, null, "topicId, question, and answer are required");
    }

    try {
        const note = await notesService.createNote({ topicId, question, answer });
        return writeResponse(res, 201, note, "Note created successfully");
    } catch (error) {
        return writeResponse(res, 500, null, "Error creating note");
    }
};

const getTopicNotes = async (req, res) => {
    try {
        const notes = await notesService.getNotesByTopic(req.params.topicId);
        return writeResponse(res, 200, notes, "Notes fetched successfully");
    } catch (error) {
        return writeResponse(res, 500, null, "Error fetching notes");
    }
};

const getNoteDetails = async (req, res) => {
    try {
        const note = await notesService.getNoteById(req.params.id);
        if (!note) return writeResponse(res, 404, null, "Note not found");
        return writeResponse(res, 200, note, "Note details fetched");
    } catch (error) {
        return writeResponse(res, 500, null, "Error fetching note");
    }
};

const updateNote = async (req, res) => {
    try {
        const updatedNote = await notesService.updateNote(req.params.id, req.body);
        if (!updatedNote) return writeResponse(res, 404, null, "Note not found");
        return writeResponse(res, 200, updatedNote, "Note updated successfully");
    } catch (error) {
        return writeResponse(res, 500, null, "Error updating note");
    }
};

const deleteNote = async (req, res) => {
    try {
        const deleted = await notesService.deleteNote(req.params.id);
        if (!deleted) return writeResponse(res, 404, null, "Note not found");
        return writeResponse(res, 200, null, "Note deleted successfully");
    } catch (error) {
        return writeResponse(res, 500, null, "Error deleting note");
    }
};

module.exports = {
    createNote,
    getTopicNotes,
    getNoteDetails,
    updateNote,
    deleteNote
};