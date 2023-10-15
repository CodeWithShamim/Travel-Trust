import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { ILogin, ILoginResponse } from './auth.interface';
import bcrypt from 'bcrypt';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const login = async (data: ILogin): Promise<ILoginResponse> => {
  // check user exists
  const isExistUser = await prisma.user.findFirst({
    where: {
      email: data?.email,
    },
  });

  if (!isExistUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // check password
  const isPasswordMatch = await bcrypt.compare(
    data?.password,
    isExistUser.password
  );

  if (!isPasswordMatch) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Email or password is incorrect!'
    );
  }

  const { role, id } = isExistUser;

  const accessToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  login,
};
