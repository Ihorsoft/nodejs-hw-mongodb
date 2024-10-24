// src/routers/auth.js

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
//import { registerUserSchema } from '../validation/auth.js';
//import { registerUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserSchema,
  loginWithGoogleOAuthSchema,
  registerUserSchema,
} from '../validation/auth.js';
import {
  loginUserController,
  loginWithGoogleController,
  logoutUserController,
  registerUserController,
} from '../controllers/auth.js';
//import { logoutUserController } from '../controllers/auth.js';
import {
  refreshUserSessionController,
  getGoogleOAuthUrlController,
} from '../controllers/auth.js';
import {
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import { requestResetEmailController } from '../controllers/auth.js';
import { resetPasswordController } from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));
router.post('/refresh', ctrlWrapper(refreshUserSessionController));
router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);
router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

// routers for login by google
router.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));
router.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);

export default router;
