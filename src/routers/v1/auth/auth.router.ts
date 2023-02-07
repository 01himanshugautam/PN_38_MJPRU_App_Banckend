import { protect } from '@middlewares/auth-guard.middleware';
import { AuthController } from '@https/api/v1/auth/auth.controller';

import express from 'express';
const router = express.Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.get('/logout', protect(), authController.logout);

export default router;
