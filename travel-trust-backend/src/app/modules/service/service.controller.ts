import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { TravelService } from './service.service';
import sendResponse from '../../../shared/sendResponse';
import { Service } from '@prisma/client';
import httpStatus from 'http-status';

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

export const ServiceController = {
  createService,
};
