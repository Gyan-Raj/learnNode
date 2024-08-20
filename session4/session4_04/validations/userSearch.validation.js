const { celebrate, Joi, errors, Segments } = require("celebrate");

const validGenders = ["male", "female"];

const userSearchValidator = celebrate({
  [Segments.QUERY]: Joi.object({
    gender: Joi.string().valid(...validGenders),
    age: Joi.number().min(0).max(100),
  }).or("gender", "age"),
});

module.exports = userSearchValidator;
