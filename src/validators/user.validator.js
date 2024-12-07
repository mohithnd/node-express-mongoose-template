const joi = require("joi");

const userSchema = joi.object({
  username: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const validateCreateUser = (data) => {
  return userSchema.validate(data);
};

const validateUpdateUser = (data) => {
  return userSchema
    .fork(["username", "email", "password"], (schema) => schema.optional())
    .validate(data);
};

const validateLoginUser = (data) => {
  const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });

  return loginSchema.validate(data);
};

module.exports = {
  validateCreateUser,
  validateUpdateUser,
  validateLoginUser,
};
