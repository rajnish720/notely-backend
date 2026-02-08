const Topic = require("../models/Topic");

const createTopic = async ({ name, parentId, userId }) => {
    try {
        const topic = await Topic.create({
            name,
            parentId,
            userId
        });
        return topic;
    } catch (error) {
        throw error;
    }
};

const getTopicsByUser = async (userId) => {
    // Returns all top-level topics for this user
    return await Topic.find({ userId, parentId: null });
};

const getTopicById = async (id, userId) => {
    // Ensures a user can only fetch their own topics
    return await Topic.findOne({ _id: id, userId });
};

const getSubTopics = async (parentId, userId) => {
    // We filter by parentId AND userId to ensure users can't see others' subtopics
    // parentId will be a string from req.params, Mongoose handles the ObjectId conversion
    return await Topic.find({ 
        parentId: parentId === 'null' ? null : parentId, 
        userId 
    });
};

module.exports = {
    createTopic,
    getTopicsByUser,
    getTopicById,
    getSubTopics,
};