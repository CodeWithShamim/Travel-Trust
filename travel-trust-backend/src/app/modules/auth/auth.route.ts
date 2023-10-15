import express, { Router } from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AuthZodValidation } from './auth.validation';
const router: Router = express.Router();

router.post(
  '/',
  validateRequest(AuthZodValidation.login),
  AuthController.login
);

router.post(
  '/refresh-token',
  validateRequest(AuthZodValidation.refreshToken),
  AuthController.refreshToken
);

export const AuthRoute = router;
