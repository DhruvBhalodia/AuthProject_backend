const authService = require('./auth.service');
const axios = require('axios');

exports.product = async (req, res) => {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    res.json(response.data); 
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch products',
      error: error.message
    });
  }
}

exports.signup = async (req, res) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await authService.login(req.body);
    res.setHeader('x-refresh-token', data.refreshToken)
       .status(200).json({
          accessToken: data.token,
          refreshToken: data.refreshToken,
          user: data.user
        });
  } catch (err) {
    res.status(401).json({ message: err.message });
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

exports.refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    const [accessToken, user]  = await authService.refresh(token);
    res.status(200).json({  accessToken: accessToken,
      userId: user });
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};