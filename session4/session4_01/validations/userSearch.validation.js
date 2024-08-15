const Joi = require("joi");

const validGenders = ["male", "female"];
const userSearchSchema = Joi.object({
  gender: Joi.string().valid(...validGenders),
  age: Joi.number().min(0).max(100),
}).or("gender", "age");

const getQueryErrors = ({ gender, age }) => {
  const result = userSearchSchema.validate({ gender, age });
  return result;
};

module.exports = getQueryErrors;
