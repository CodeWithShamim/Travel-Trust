import { Service } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import handleFilters from '../../../shared/handleFilters';
import { IFilters } from './service.interface';
import { ServiceSearchableFields } from './service.constant';

const createService = async (data: Service): Promise<Service> => {
  const service = await prisma.service.create({
    data,
  });
  return service;
};

const getAllService = async (
  filters: IFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
  const whereConditions = handleFilters(filters, ServiceSearchableFields);

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.service.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.service.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const TravelService = {
  createService,
  getAllService,
};
