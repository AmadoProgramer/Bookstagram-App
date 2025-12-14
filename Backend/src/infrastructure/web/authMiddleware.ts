import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../application/services/AuthService';

export const createAuthMiddleware = (authService: AuthService) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        res.status(401).json({ error: 'No token provided' });
        return;
      }

      const decoded = authService.verifyToken(token);

      if (!decoded) {
        res.status(401).json({ error: 'Invalid token' });
        return;
      }

      (req as any).userId = decoded.userId;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
};
