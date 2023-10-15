import { Service } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createService = async (data: Service): Promise<Service> => {
  const service = await prisma.service.create({
    data,
  });
  return service;
};

export const TravelService = {
  createService,
};
