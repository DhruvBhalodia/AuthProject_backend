const { findUser, createUser } = require('../../schemas/userMdl');
const { generateToken, generateRefreshToken, encryptPassword, comparePassword, verifyRefreshToken } = require('../../helper/authHelper');

const { EmailAlreadyExistsError, InvalidCredentialsError, MissingRefreshTokenError, TokenRefreshFailedError, SignupFailedError, LoginFailedError } = require('../../utils/errorHandler');

exports.signup = async ({ username, email, password }) => {
  try {
    const existingUser = await findUser(email);
    if (existingUser) throw EmailAlreadyExistsError();

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
  } catch (err) {
    throw SignupFailedError();
  }
};

exports.login = async ({ email, password }) => {
  try {
    const user = await findUser(email);
    if (!user) throw InvalidCredentialsError();

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw InvalidCredentialsError();

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
  } catch (err) {
    console.error(err);
    throw LoginFailedError();
  }
};

exports.refresh = async (refreshToken) => {
  try {
    if (!refreshToken) throw MissingRefreshTokenError();

    const user = await verifyRefreshToken(refreshToken);
    const newAccessToken = generateToken(user);

    return [newAccessToken, user];
  } catch (err) {
    throw TokenRefreshFailedError();
  }
};
