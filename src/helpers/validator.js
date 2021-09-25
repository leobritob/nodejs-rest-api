const yupValidator = (schema) => {
  return (req, res, next) => {
    schema
      .validate(req.body, { abortEarly: false })
      .then(() => next())
      .catch((error) => res.status(400).json({ errors: error.errors }));
  };
};

module.exports = { yupValidator };
