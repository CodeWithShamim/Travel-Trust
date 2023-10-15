import express, { Router } from 'express';
import { ReviewController } from './review.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewZodValidation } from './review.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router: Router = express.Router();

router.post(
  '/',
  validateRequest(ReviewZodValidation.create),
  ReviewController.createReview
);

router.get('/', ReviewController.getAllReview);
router.get('/:id', ReviewController.getSingleReview);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(ReviewZodValidation.update),
  ReviewController.updateReview
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ReviewController.deleteReview
);

export const ReviewRoute = router;
