const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes.controller');
const { authMiddleware } = require('../middlewares/auth');

router.use(authMiddleware);

router.post('/', notesController.createNote); // Create Note
router.get('/topic/:topicId', notesController.getTopicNotes); // Get all notes for a topic
router.get('/:id', notesController.getNoteDetails); // Get specific note
router.put('/:id', notesController.updateNote); // Update note
router.delete('/:id', notesController.deleteNote); // Delete note

module.exports = router;