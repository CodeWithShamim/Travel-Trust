import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Booking } from '@prisma/client';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { BookingFilterableFields } from './booking.constant';
import { BookingService } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await BookingService.createBooking(data);

  sendResponse<Booking>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBooking = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BookingFilterableFields);
  const options = pick(req.query, paginationFields);

  const result = await BookingService.getAllBooking(
    filters,
    options,
    req?.user
  );

  sendResponse<Booking[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookingService.getSingleBooking(id, req?.user);

  sendResponse<Booking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retrieved successfully',
    data: result,
  });
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await BookingService.updateBooking(id, data, req?.user);

  sendResponse<Booking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

const updateStatuses = catchAsync(async (req: Request, res: Response) => {
  const data = req.body?.statuses;
  const result = await BookingService.updateStatuses(data);

  sendResponse<Booking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings updated successfully',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookingService.deleteBooking(id, req?.user);

  sendResponse<Booking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBooking,
  getSingleBooking,
  updateBooking,
  updateStatuses,
  deleteBooking,
};
