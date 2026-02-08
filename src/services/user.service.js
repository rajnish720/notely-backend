const User = require('../models/User');
const { getToken } = require('../utils/common');
const bcrypt = require('bcryptjs');

const createUser = async (payload) => {
    
    const user = await User.create(payload);
    const token = getToken({
      userId: user._id,
      email: user.email
    });

    await User.updateOne({
        _id: user._id
    }, {
        token,
    });

    return {
        userId: user._id,
        email: user.email,
        username: user.username,
        token,
    };
}

const loginUser = async (payload) => {

    const { username, email, password } = payload;
    
    const user = await User.findOne({
        $or: [
            { email },
            { username }
        ]
    }).select('+password');;

    if(!user) {
        throw new Error("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect) {
        throw new Error("Password not correct");
    }

    const token = getToken({
      userId: user._id,
      email: user.email
    });

    await User.updateOne({
        _id: user._id
    }, {
        token,
    });

    return {
        userId: user._id,
        email: user.email,
        username: user.username,
        token,
    };
}

module.exports = {
    createUser,
    loginUser,
}