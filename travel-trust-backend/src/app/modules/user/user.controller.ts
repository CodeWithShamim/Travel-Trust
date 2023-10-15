import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { UserFilterableFields } from './user.constant';
import { UserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await UserService.createUser(data);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, UserFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await UserService.getAllUser(filters, options);

  sendResponse<User[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUser(id);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await UserService.updateUser(id, data);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.deleteUser(id);

  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
