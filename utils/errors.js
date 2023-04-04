const ERROR_INVALID_DATA = new Error(
  "Data passed to create/update item is invalid"
);
ERROR_INVALID_DATA.statusCode = 400;

const ERROR_DOES_NOT_EXIST = new Error(
  "Requested data with this ID was not found"
);
ERROR_DOES_NOT_EXIST.statusCode = 404;

const ERROR_DEFAULT = new Error("An error has occured on the server");
ERROR_DEFAULT.statusCode = 500;

module.exports = { ERROR_DEFAULT, ERROR_DOES_NOT_EXIST, ERROR_INVALID_DATA };
