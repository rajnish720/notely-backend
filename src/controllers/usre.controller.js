const { createUserSchema, loginUserSchema } = require("../validators/user.validator");
const userService = require('../services/user.service');

const createUser = async (req, res) => {
  try {
    const { error, value } = createUserSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }

    const data = await userService.createUser(value);

    

    res.status(201).json({ success: true, data });

  } catch (error) {
    // Check for MongoDB Duplicate Key Error
    if (error.code === 11000) {
      // error.keyValue contains the field that caused the error (e.g., { email: "test@test.com" })
      const field = Object.keys(error.keyValue)[0];
      const value = error.keyValue[field];
      
      return res.status(409).json({ 
        message: `The ${field} '${value}' is already taken. Please use another one.` 
      });
    }

    // Handle generic server errors
    console.error(error); // Log for debugging
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { error, value } = loginUserSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }

    const data = await userService.loginUser(value);

    res.status(201).json({ success: true, data });

  } catch (error) {

    // Handle generic server errors
    console.error(error); // Log for debugging
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createUser,
  loginUser,
}