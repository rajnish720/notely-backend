const Joi = require("joi");

const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),

  name: Joi.string().min(3).required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(6).required()
})
  .required()
  .strict(); // ⬅ disallow unknown fields

const loginUserSchema = Joi.object({
  username: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(6).required()
})
  .or('username', 'email')
  .required()
  .strict();

module.exports = {
  createUserSchema,
  loginUserSchema,
};
