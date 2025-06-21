const { findUser, createUser } = require('../../schemas/userMdl');
const { generateToken, generateRefreshToken, encryptPassword, comparePassword } = require('../../helper/authHelper');

exports.signup = async ({ username, email, password }) => {
  const existingUser = await findUser(email);
  if (existingUser) throw new Error('EMAIL_ALREADY_EXISTS')

  const hashedPassword = await encryptPassword(password);
  const user = await createUser({ username, email, password: hashedPassword });

  return {
    message: 'Signup successful',
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  };
};

exports.login = async ({ email, password }) => {
  const user = await findUser(email);
  if (!user) throw new Error('INVALID_CREDENTIALS');
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error('INVALID_CREDENTIALS');

  const token = generateToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken: token,
    refreshToken,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  };
};