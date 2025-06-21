const authService = require('./auth.service');
const axios = require('axios');
const generateToken = require('../../helper/authHelper')

exports.product = async (req, res, next) => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    res.json(response.data); 
  } catch (err) {
    next(err);
  }
}

exports.signup = async (req, res, next) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    res.setHeader('x-refresh-token', data.refreshToken)
       .status(200).json({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user: data.user
        });
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict'
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

exports.refresh = async (req, res, next) => {
  try {
    const newAccessToken = generateToken(req.user);
    res.status(200).json({
      accessToken: newAccessToken,
      userId: req.user.id
    });
  } catch (err) {
    next(err);
  }
};