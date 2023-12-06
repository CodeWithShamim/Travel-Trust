import express, { Router } from 'express';
import { PaymentController } from './payment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { PaymentZodValidation } from './payment.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router: Router = express.Router();

router.post(
  '/create-payment-intent',
  validateRequest(PaymentZodValidation.create),
  PaymentController.createPaymentIntent
);

router.get('/', PaymentController.getAllPayment);
router.get('/:id', PaymentController.getSinglePayment);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(PaymentZodValidation.update),
  PaymentController.updatePayment
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  PaymentController.deletePayment
);

export const PaymentRoute = router;
