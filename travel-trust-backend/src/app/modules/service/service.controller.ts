import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { TravelService } from './service.service';
import sendResponse from '../../../shared/sendResponse';
import { Service } from '@prisma/client';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { ServiceFilterableFields } from './service.constant';

const createService = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await TravelService.createService(data);

  sendResponse<Service>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Service created successfully',
    data: result,
  });
});

const getAllService = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ServiceFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await TravelService.getAllService(filters, options);

  sendResponse<Service[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const ServiceController = {
  createService,
  getAllService,
};
