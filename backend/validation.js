const Joi = require('joi');

const registerValidation = (data) => {
 const schema = Joi.object({
  name: Joi.string()
   .min(4)
   .required()
   .messages({ 'string.empty': 'name cannot be empty' }),
  email: Joi.string()
   .required()
   .email()
   .messages({ 'string.empty': 'email cannot be empty' }),
  password: Joi.string()
   .min(6)
   .required()
   .messages({ 'string.min': 'min password length is 6' })
 }).messages({
  'string.base': 'name should be of type text',
  'string.min': `min name length is 4`,
  'any.required': 'name is required',
  'string.email': 'invalid email'
 });

 return schema.validate(data, { abortEarly: false });
};

const loginValidation = (data) => {
 const schema = Joi.object({
  email: Joi.string().required().email().messages({
   'string.base': 'email should be of type text',
   'string.empty': 'email is required',
   'any.required': 'email is required',
   'string.email': 'enter a valid email'
  }),
  password: Joi.string().min(6).required().messages({
   'string.base': 'password should be of type text',
   'string.empty': 'password is required',
   'any.required': 'password is required',
   'string.min': 'min password length is 6'
  })
 });

 return schema.validate(data, { abortEarly: false });
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
