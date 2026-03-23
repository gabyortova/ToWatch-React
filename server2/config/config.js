const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    port: process.env.PORT || 5100,
    dbURL: "mongodb://localhost:27017/to-watch",
    origin: "http://localhost:5174",
  },
  production: {
    port: process.env.PORT || 5100,
    dbURL: process.env.DB_URL_CREDENTIALS,
    origin: ["http://localhost:5174", "https://YOUR-REAL-APP.vercel.app"],
  },
};

module.exports = config[env];
