import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import config from '../../../config';

const login = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AuthService.login(data);
  const { refreshToken, ...others } = result;

  // set refresh token into browser cookie
  const cookieOptions = {
    secure: config.node_env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: httpStatus.OK,
    data: others,
  });
});

export const AuthController = {
  login,
};
