import { Router } from 'express';
import { AuthController } from '../controller/AuthController';
import { createAuthMiddleware } from '../web/authMiddleware';
import { AuthService } from '../../application/services/AuthService';

export const createAuthRoutes = (authController: AuthController, authService: AuthService): Router => {
  const router = Router();
  const authMiddleware = createAuthMiddleware(authService);

  router.post('/register', (req, res) => authController.register(req, res));
  router.post('/login', (req, res) => authController.login(req, res));
  router.post('/refresh', (req, res) => authController.refreshToken(req, res));
  router.post('/logout', authMiddleware, (req, res) => authController.logout(req, res));
  router.get('/me', authMiddleware, (req, res) => authController.getCurrentUser(req, res));

  return router;
};