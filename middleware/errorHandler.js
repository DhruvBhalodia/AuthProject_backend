const errorMessages = require('../utils/errorMessages');

module.exports = (err, req, res, next) => {
  const errorInfo = errorMessages[err.message];

  if (errorInfo) {
    return res.status(errorInfo.httpStatusCode).json({
      code: errorInfo.body.code,
      message: errorInfo.body.message
    });
  }

  console.error("Unhandled error:", err);
  return res.status(500).json({
    code: 'internal_server_error',
    message: 'Something went wrong.'
  });
};
