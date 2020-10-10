const Joi = require('joi');

const registerValidation = (data) => {
 const schema = Joi.object({
  name: Joi.string()
   .min(4)
   .required()
   .error((errors) => {
    return 'found';
   }),
  email: Joi.string().required().email(),
  password: Joi.string().min(6).required()
 });

 return schema.validate(data, (err, value) => {
  return value;
 });
};

const loginValidation = (data) => {
 const schema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(6).required()
 });

 return schema.validate(data, (err, value) => {
  return err + value;
 });
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
