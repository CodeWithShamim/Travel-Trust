import express, { Router } from 'express';
import { ServiceController } from './service.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceZodValidation } from './service.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router: Router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(ServiceZodValidation.create),
  ServiceController.createService
);

router.get('/', ServiceController.getAllService);
router.get('/:id', ServiceController.getSingleService);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(ServiceZodValidation.update),
  ServiceController.updateService
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ServiceController.deleteService
);

export const ServiceRoute = router;
