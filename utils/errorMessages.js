module.exports = {
  EMAIL_ALREADY_EXISTS: {
    httpStatusCode: 400,
    body: {
      code: 'email_already_exists',
      message: 'Email already registered'
    }
  },
  INVALID_CREDENTIALS: {
    httpStatusCode: 401,
    body: {
      code: 'invalid_credentials',
      message: 'Invalid credentials'
    }
  },
  MISSING_REFRESH_TOKEN: {
    httpStatusCode: 400,
    body: {
      code: 'missing_refresh_token',
      message: 'No refresh token provided'
    }
  },
  MISSING_ACCESS_TOKEN: {
    httpStatusCode: 400,
    body: {
      code: 'missing_access_token',
      message: 'No access token provided'
    }
  },
  REFRESH_FAILED: {
    httpStatusCode: 403,
    body: {
      code: 'refresh_failed',
      message: 'Token refresh failed'
    }
  },
  SIGNUP_FAILED: {
    httpStatusCode: 500,
    body: {
      code: 'signup_failed',
      message: 'Signup failed'
    }
  },
  LOGIN_FAILED: {
    httpStatusCode: 500,
    body: {
      code: 'login_failed',
      message: 'Login failed'
    }
  },
  INVALID_ACCESS_TOKEN: {
    httpStatusCode: 403,
    code: 'invalid_access_token',
    message: 'Access token is invalid or expired.'
  },
  INVALID_REFRESH_TOKEN: {
    httpStatusCode: 403,
    code: 'invalid_refresh_token',
    message: 'Refresh token is invalid or expired.'
  }  
};
