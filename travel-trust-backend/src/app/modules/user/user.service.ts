/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import handleFilters from '../../../shared/handleFilters';
import prisma from '../../../shared/prisma';
import { UserSearchableFields } from './user.constant';
import { IFilters } from './user.interface';
import { hashPassword, returnUserValue } from './user.utils';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Request } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { JwtPayload, Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';

const createUser = async (data: User): Promise<User> => {
  const generateHashPassword = await hashPassword(data?.password);
  data.password = generateHashPassword;
  data.role = 'user';
  const User = await prisma.user.create({
    data,
  });

  const { role, id } = User;

  const accessToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return returnUserValue({ ...User, accessToken });
};

const getAllUser = async (
  filters: IFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  // <<---------------------------------------------->>
  const whereConditions = handleFilters(filters, UserSearchableFields);

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: returnUserValue(result),
  };
};

const getSingleUser = async (
  id: string,
  user: JwtPayload | null
): Promise<User | null> => {
  const isUser = user?.role === ENUM_USER_ROLE.USER;
  const where = isUser ? { id: user?.id } : { id };
  const result = await prisma.user.findUnique({
    where,
  });
  return returnUserValue(result);
};

const updateUser = async (
  id: string,
  data: Partial<User>,
  req: Request
): Promise<User> => {
  delete data?.role;
  const user = req?.user;
  const isUser = user?.role === ENUM_USER_ROLE.USER;
  const where = isUser ? { id: user?.id } : { id };

  const result = await prisma.user.update({
    where,
    data,
  });

  return returnUserValue(result);
};

const deleteUser = async (id: string, req: Request): Promise<User> => {
  const user = req?.user;
  const isUser = user?.role === ENUM_USER_ROLE.USER;
  const where = isUser ? { id: user?.id } : { id };

  const result = await prisma.user.delete({
    where,
  });

  return returnUserValue(result);
};

const createAdmin = async (data: User): Promise<User> => {
  const generateHashPassword = await hashPassword(data?.password);
  data.password = generateHashPassword;
  data.role = 'admin';
  const User = await prisma.user.create({
    data,
  });
  return returnUserValue(User);
};

const deleteAdmin = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
    where: {
      id,
      role: 'admin',
    },
  });
  return returnUserValue(result);
};

const updateUserToAdmin = async (
  id: string,
  user: User | any
): Promise<User | null> => {
  let result = null;

  if (user?.role === ENUM_USER_ROLE.SUPER_ADMIN) {
    result = await prisma.user.update({
      where: {
        id,
      },
      data: { role: 'admin' },
    });
  } else {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not perform this action!'
    );
  }

  return returnUserValue(result);
};

export const UserService = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  createAdmin,
  deleteAdmin,
  updateUserToAdmin,
};
