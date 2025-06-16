class AppError extends Error {
    constructor(message, statusCode = 500) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  const EmailAlreadyExistsError = () => new AppError("Email already registered", 400);
  const InvalidCredentialsError = () => new AppError("Invalid credentials", 401);
  const MissingRefreshTokenError = () => new AppError("No refresh token provided", 400);
  const TokenRefreshFailedError = () => new AppError("Token refresh failed", 403);
  const SignupFailedError = () => new AppError("Signup failed", 500);
  const LoginFailedError = () => new AppError("Login failed", 500);
  
  module.exports = {
    AppError,
    EmailAlreadyExistsError,
    InvalidCredentialsError,
    MissingRefreshTokenError,
    TokenRefreshFailedError,
    SignupFailedError,
    LoginFailedError
  };
  