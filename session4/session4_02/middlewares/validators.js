const validator = (schema) => (req, res, next) => {
  const { gender, age } = req.query;
  const { error } = schema.validate({ gender, age });
  if (error) {
    return res.status(422).send({ message: error.details[0].message });
  } else {
    next();
  }
};

module.exports = validator;
