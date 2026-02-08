const jwt = require('jsonwebtoken');
const { writeResponse } = require("../utils/common");

const authMiddleware = (req, res, next) => {
    // 1. Fix typo: 'authorization' and access via req.headers (plural)
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return writeResponse(res, 401, null, "Authorization header missing");
    }

    // 2. Extract token from "Bearer <token>"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return writeResponse(res, 401, null, "Token format invalid (Use 'Bearer <token>')");
    }

    const token = parts[1];

    try {
        // 3. Verify token
        const userData = jwt.verify(token, process.env.JWT_SECRET);
        
        // 4. Attach to req object (Best Practice)
        req.user = userData; 

        // 5. Move to the next middleware/controller
        next(); 
    } catch (error) {
        // Handle expired or tampered tokens
        return writeResponse(res, 401, null, "Invalid or expired token");
    }
};

module.exports = { authMiddleware };