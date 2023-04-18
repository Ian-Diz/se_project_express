const INVALID_DATA_CODE = 400;

const UNAUTHORIZED_CODE = 401;

const FORBIDDEN_CODE = 403;

const FORBIDDEN = new Error(
  "You do not have permission to delete this resource"
);

const ERROR_DOES_NOT_EXIST = new Error(
  "Requested data with this ID was not found"
);
ERROR_DOES_NOT_EXIST.statusCode = 404;

const DOES_NOT_EXIST_CODE = 404;

const CONFLICT_CODE = 409;

const DEFAULT_CODE = 500;

module.exports = {
  ERROR_DOES_NOT_EXIST,
  INVALID_DATA_CODE,
  DOES_NOT_EXIST_CODE,
  DEFAULT_CODE,
  UNAUTHORIZED_CODE,
  FORBIDDEN_CODE,
  FORBIDDEN,
  CONFLICT_CODE,
};
