const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.verifyAccessToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return reject(new Error('Invalid or expired token'));
      resolve(decoded);
    });
  });
};

exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_expiresIn || '1d'
  });
};

exports.encryptPassword = async (plainPassword) => {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
};
exports.generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};
exports.comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

exports.verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    const jwt = require('jsonwebtoken');
    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
};