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

const createUser = async (data: User): Promise<User> => {
  const generateHashPassword = await hashPassword(data?.password);
  data.password = generateHashPassword;
  const User = await prisma.user.create({
    data,
  });
  return returnUserValue(User);
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

const getSingleUser = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return returnUserValue(result);
};

const updateUser = async (id: string, data: Partial<User>): Promise<User> => {
  delete data?.role;

  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  return returnUserValue(result);
};

const deleteUser = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return returnUserValue(result);
};

export const UserService = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
