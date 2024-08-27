const { celebrate, Joi, errors, Segments } = require("celebrate");

const validGenders = ["male", "female"];

const userSearchSchema = Joi.object({
  gnder: Joi.string().valid(...validGenders),
  age: Joi.number().min(0).max(100),
}).or("gender", "age");

const userSearchValidator = celebrate({
  [Segments.QUERY]: userSearchSchema,
});
module.exports = userSearchValidator;
