const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const getToken = (payload) => {
    return jwt.sign(payload, secret, {
        algorithm: 'HS256',
        expiresIn: '7d'
    });
}

const writeResponse = (res, statusCode = 200, data = null, message = null) => {
    // res.status() sets the HTTP code, .json() sends the body and ends the request
    return res.status(statusCode).json({
        success: statusCode >= 200 && statusCode < 300,
        message,
        data
    });
};

module.exports = {
    getToken,
    writeResponse
}