const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'SoftSecret2';
const refreshSecret = process.env.REFRESH_SECRET || 'SoftRefreshSecret';

function createToken(data) {
  return jwt.sign(data, secret, { expiresIn: '1d' });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

function verifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, refreshSecret, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

function refreshToken(req, res) {
  const refreshToken = req.cookies['refreshToken'];
  if (!refreshToken) {
    return res.status(401).send({ message: 'Refresh token missing!' });
  }

  // Verify refresh token with the correct secret
  verifyRefreshToken(refreshToken)
    .then((decoded) => {
      // Generate a new access token
      const newAccessToken = createToken({ id: decoded.id });

      // Return the new access token
      res.json({ accessToken: newAccessToken });
    })
    .catch((err) => {
      return res.status(403).send({ message: 'Invalid refresh token!' });
    });
}

module.exports = {
  createToken,
  verifyToken,
  verifyRefreshToken,
  refreshToken
};