import express, { Router } from 'express';
import { ServiceController } from './service.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceZodValidation } from './service.validation';
const router: Router = express.Router();

router.post(
  '/',
  validateRequest(ServiceZodValidation.create),
  ServiceController.createService
);

export const ServiceRoute = router;
