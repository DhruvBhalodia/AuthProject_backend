const { verifyAccessToken, verifyRefreshToken } = require('../helper/authHelper');

exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new Error('MISSING_ACCESS_TOKEN');

    const token = authHeader.split(' ')[1];
      const userPayload = await verifyAccessToken(token);
      req.user = userPayload;
      next();
  } catch (err) {
    next(err);
  }
};


exports.verifyRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new Error('MISSING_REFRESH_TOKEN');

    const user = await verifyRefreshToken(refreshToken);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};


exports.validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      return res.status(400).json({ errors });
    }
    next();
  };
};