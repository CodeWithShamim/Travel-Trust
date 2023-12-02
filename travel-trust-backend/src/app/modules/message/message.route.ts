import express, { Router } from 'express';
import { MessageController } from './message.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { MessageZodValidation } from './message.validation';

const router: Router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(MessageZodValidation.create),
  MessageController.createMessage
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  MessageController.getAllMessage
);

export const MessageRoute = router;
