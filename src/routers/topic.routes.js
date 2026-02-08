const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topic.controller');
const { authMiddleware } = require('../middlewares/auth');

// Apply authMiddleware to all routes in this router
router.use(authMiddleware);

router.post('/', topicController.createTopic);
router.get('/', topicController.getAllTopics);
router.get('/parentId/:parentId', topicController.getSubTopics);
router.get('/:id', topicController.getTopic);

module.exports = router;