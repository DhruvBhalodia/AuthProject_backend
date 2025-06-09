const authService = require('./auth.service');

exports.signup = async (req, res) => {
  console.log("signup");
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
    res.status(200).json(data);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
