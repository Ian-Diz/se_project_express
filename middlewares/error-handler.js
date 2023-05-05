const { DEFAULT_CODE } = require("../utils/errors");

module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === DEFAULT_CODE ? "An error occured on the server" : message,
  });

  next();
};
