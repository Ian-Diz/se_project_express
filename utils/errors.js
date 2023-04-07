const ERROR_INVALID_DATA = new Error(
  "Data passed to create/update item is invalid"
);
ERROR_INVALID_DATA.statusCode = 400;

const INVALID_DATA_CODE = 400;

const ERROR_DOES_NOT_EXIST = new Error(
  "Requested data with this ID was not found"
);
ERROR_DOES_NOT_EXIST.statusCode = 404;

const DOES_NOT_EXIST_CODE = 404;

const DEFAULT_CODE = 500;

module.exports = {
  ERROR_DOES_NOT_EXIST,
  ERROR_INVALID_DATA,
  INVALID_DATA_CODE,
  DOES_NOT_EXIST_CODE,
  DEFAULT_CODE,
};
