module.exports = {
  EMAIL_ALREADY_EXISTS: {
    httpStatusCode: 400,
    body: {
      code: 'duplicate',
      message: 'Email already registered'
    }
  },
  INVALID_CREDENTIALS: {
    httpStatusCode: 401,
    body: {
      code: 'forbidden',
      message: 'Invalid credentials'
    }
  },
  MISSING_REFRESH_TOKEN: {
    httpStatusCode: 400,
    body: {
      code: 'information_missing',
      message: 'No refresh token provided'
    }
  },
  MISSING_ACCESS_TOKEN: {
    httpStatusCode: 400,
    body: {
      code: 'information_missing',
      message: 'No access token provided'
    }
  },
  REFRESH_FAILED: {
    httpStatusCode: 403,
    body: {
      code: 'failed',
      message: 'Token refresh failed'
    }
  },
  SIGNUP_FAILED: {
    httpStatusCode: 500,
    body: {
      code: 'failed',
      message: 'Signup failed'
    }
  },
  LOGIN_FAILED: {
    httpStatusCode: 500,
    body: {
      code: 'failed',
      message: 'Login failed'
    }
  },
  INVALID_ACCESS_TOKEN: {
    httpStatusCode: 403,
    body: {
      code: 'forbidden',
      message: 'Access token is invalid or expired.'
    }
  },
  INVALID_REFRESH_TOKEN: {
    httpStatusCode: 403,
    body : {
      code: 'forbidden',
      message: 'Refresh token is invalid or expired.'
    }
  }  
};
