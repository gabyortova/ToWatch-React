const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 5100,
        dbURL: 'mongodb://localhost:27017/to-watch',
        origin: 'http://localhost:5173',
    },
    production: {
        port: process.env.PORT || 5100,
        dbURL: process.env.DB_URL_CREDENTIALS,
        origin: []
    }
};

module.exports = config[env];
