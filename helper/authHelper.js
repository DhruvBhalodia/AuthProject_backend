const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { config } = require('../config');

exports.verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) return reject(new Error('INVALID_ACCESS_TOKEN'));
      resolve(decoded);
    });
  });
};

exports.verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) return reject(new Error('INVALID_REFRESH_TOKEN'));
      resolve(decoded);
    });
  });
};


exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username
    },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN }
  );
};

exports.encryptPassword = async (plainPassword) => {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
};
exports.generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, config.JWT_REFRESH_SECRET, { expiresIn: config.JWT_REFRESH_EXPIRES_IN });
};
exports.comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};