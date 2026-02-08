const topicService = require("../services/topic.service");
const { writeResponse } = require("../utils/common");

const createTopic = async (req, res) => {
    const { name, parentId = null } = req.body;
    const userId = req.user.userId; // Populated by authMiddleware

    if (!name) {
        return writeResponse(res, 400, null, "Topic name is required");
    }

    try {
        const newTopic = await topicService.createTopic({ name, parentId, userId });
        return writeResponse(res, 201, newTopic, "Topic created successfully");
    } catch (error) {
        console.error("Topic Creation Error:", error);
        return writeResponse(res, 500, null, "Internal Server Error");
    }
};

const getAllTopics = async (req, res) => {
    try {
        const topics = await topicService.getTopicsByUser(req.user.userId);
        return writeResponse(res, 200, topics, "Topics fetched successfully");
    } catch (error) {
        return writeResponse(res, 500, null, "Server Error");
    }
};

const getTopic = async (req, res) => {
    try {
        const topic = await topicService.getTopicById(req.params.id, req.user.userId);
        if (!topic) return writeResponse(res, 404, null, "Topic not found");
        
        return writeResponse(res, 200, topic, "Topic details fetched");
    } catch (error) {
        return writeResponse(res, 500, null, "Server Error");
    }
};

const getSubTopics = async (req, res) => {
    try {
        const { parentId } = req.params;
        const userId = req.user.userId;

        const subTopics = await topicService.getSubTopics(parentId, userId);

        return writeResponse(
            res, 
            200, 
            subTopics, 
            `Fetched ${subTopics.length} sub-topics successfully`
        );
    } catch (error) {
        console.error("Fetch Sub-topics Error:", error);
        return writeResponse(res, 500, null, "Error fetching sub-topics");
    }
};

module.exports = {
    createTopic,
    getAllTopics,
    getTopic,
    getSubTopics,
};