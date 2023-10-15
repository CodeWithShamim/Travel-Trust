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

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await TravelService.getSingleService(id);

  sendResponse<Service>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service retrieved successfully',
    data: result,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await TravelService.updateService(id, data);

  sendResponse<Service>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await TravelService.deleteService(id);

  sendResponse<Service>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted successfully',
    data: result,
  });
});

export const ServiceController = {
  createService,
  getAllService,
  getSingleService,
  updateService,
  deleteService,
};
