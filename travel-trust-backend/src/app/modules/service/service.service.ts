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

const getSingleService = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateService = async (
  id: string,
  data: Partial<Service>
): Promise<Service> => {
  const result = await prisma.service.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteService = async (id: string): Promise<Service> => {
  const result = await prisma.service.delete({
    where: {
      id,
    },
  });

  return result;
};

export const TravelService = {
  createService,
  getAllService,
  getSingleService,
  updateService,
  deleteService,
};
