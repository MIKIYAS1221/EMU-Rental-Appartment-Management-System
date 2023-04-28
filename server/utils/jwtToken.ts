import { IUser } from '../models/User';
import { Response } from 'express';

// Create and send token and save in the cookie.
const sendToken = (user: IUser, statusCode: number, res: Response): void => {
  // Create Jwt token
  const token = user.getJwtToken();

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + parseInt(process.env.COOKIE_EXPIRES_TIME || '7', 10) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user,
  });
};

export default sendToken;
