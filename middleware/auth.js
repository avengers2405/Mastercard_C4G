const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../config/configKeys");

exports.auth = (req, res, next) => {
  const token = req.headers["mastercard-jwt"];
  if (!token) {
    return res
      .status(401)
      .json({ jwt_error: "No token, authorization denied" });
  }
  // verify token
  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ jwt_error: "Token is invalid" });
  }
};