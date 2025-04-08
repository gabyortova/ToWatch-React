const jwt = require('./jwt');
const { authCookieName } = require('../app-config');
const {
    userModel,
    tokenBlacklistModel
} = require('../models');

function auth(redirectUnauthenticated = true) {
    return function (req, res, next) {
        const token =
      req.headers["x-authorization"] || req.cookies[authCookieName] || "";
        console.debug(req.cookies);

        console.log('req.cookies[authCookieName] ' + req.cookies[authCookieName]);
        
        console.log('Token from cookies:', token);  // Лог за да видите токена
        
        Promise.all([
            jwt.verifyToken(token),
            tokenBlacklistModel.findOne({ token })
        ])
            .then(([data, blacklistedToken]) => {
                if (blacklistedToken) {
                    console.log('Token is blacklisted');
                    return Promise.reject(new Error('blacklisted token'));
                }
                userModel.findById(data.id)
                    .then(user => {
                        req.user = user;  // Задаване на потребител в req.user
                        req.isLogged = true;
                        next();
                    })
                    .catch(err => {
                        console.log('Error finding user:', err);
                        next(err);
                    });
            })
            .catch(err => {
                console.error('Auth error:', err.message); // Лог за грешка
                if (!redirectUnauthenticated) {
                    next();
                    return;
                }
                if (['token expired', 'blacklisted token', 'jwt must be provided'].includes(err.message)) {
                    console.error(err);
                    res.status(401).send({ message: "Invalid token!" });
                    return;
                }
                next(err);
            });
    }
}


module.exports = auth;
