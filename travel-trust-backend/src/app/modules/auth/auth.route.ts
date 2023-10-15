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

export const AuthRoute = router;
