const { verifyAccessToken } = require('../helper/authHelper');

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];

  try {
    const userPayload = await verifyAccessToken(token);
    req.user = userPayload;
    next();
  } catch (err) {
    res.status(403).json({ message: err.message });
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