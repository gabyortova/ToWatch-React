const jwt = require("./jwt");
const { userModel, tokenBlacklistModel } = require("../models");

function auth() {
  return async function (req, res, next) {
    try {
      // get x-authorization header
      const token = req.headers["x-authorization"];

      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      // check if token is blacklisted
      const blacklistedToken = await tokenBlacklistModel.findOne({ token });
      if (blacklistedToken) {
        return res.status(401).json({ message: "Token is blacklisted" });
      }

      // verify JWT
      const decoded = await jwt.verifyToken(token);

      if (!decoded || !decoded.id) {
        return res.status(401).json({ message: "Invalid token" });
      }

      // взимаме user от DB
      const user = await userModel.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // attach to request
      req.user = user;
      req.isLogged = true;

      next();
    } catch (err) {
      console.error("Auth middleware error:", err.message);
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
}

module.exports = auth;
