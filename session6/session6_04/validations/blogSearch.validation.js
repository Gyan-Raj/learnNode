const { celebrate, Joi, errors, Segments } = require("celebrate");

const blogSearchSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string().email(),
}).or("title", "author");

const blogSearchValidator = celebrate({
  [Segments.QUERY]: blogSearchSchema,
});

module.exports = blogSearchValidator;
