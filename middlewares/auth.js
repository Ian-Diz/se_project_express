const jwt = require("jsonwebtoken");

require("dotenv").config();

const { REACT_APP_JWT_SECRET } = process.env.REACT_APP_JWT_SECRET;

const UnauthorizedError = require("../errors/UnauthorizedError");

const exctractBearerToken = (header) => header.replace("Bearer ", "");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return Promise.reject(new UnauthorizedError("Authorization error"));
  }

  const token = exctractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, REACT_APP_JWT_SECRET);
  } catch (err) {
    return Promise.reject(new UnauthorizedError("Authorization error"));
  }

  req.user = payload;

  return next();
};
