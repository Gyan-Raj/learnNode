const validator = (schema) => (req, res, next) => {
  const { error } = schema.validate(req);
  if (error) {
    return res.status(422).send({ message: error.details[0].message });
  } else {
    next();
  }
};

module.exports = validator;
