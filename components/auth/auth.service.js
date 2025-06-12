const { findUser, createUser } = require('../../schemas/userMdl');
const { generateToken, generateRefreshToken, encryptPassword, comparePassword, verifyRefreshToken } = require('../../helper/authHelper');

exports.signup = async ({ username, email, password }) => {
  const existingUser = await findUser(email);
  if (existingUser) throw new Error("Email already registered");

  const hashedPassword = await encryptPassword(password);
  const user = await createUser({ username, email, password: hashedPassword });

  return {
    message: 'Signup successful',
    user: { id: user._id, username: user.username, email: user.email }
  };
};

exports.login = async ({ email, password }) => {
  const user = await findUser(email);
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user);

  return {
    token,
    refreshToken,
    user: { id: user._id, username: user.username, email: user.email }
  };
};

exports.refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) throw new Error("No refresh token");
  const user = await verifyRefreshToken(refreshToken);
  const newAccessToken = generateToken(user.id);

  return [newAccessToken, user.id];
};