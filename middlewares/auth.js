const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;

const {
  ERROR_DOES_NOT_EXIST,
  INVALID_DATA_CODE,
  DOES_NOT_EXIST_CODE,
  DEFAULT_CODE,
  UNAUTHORIZED_CODE,
} = require("../utils/errors");

const handleAuthError = (res) => {
  res.status(UNAUTHORIZED_CODE).send({ message: "Authorization Error" });
};

const exctractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = exctractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};
