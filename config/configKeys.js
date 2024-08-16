require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  backendURL: process.env.BACKEND_URL,
  jwtSecretKey: process.env.JWT_SECRET,
};