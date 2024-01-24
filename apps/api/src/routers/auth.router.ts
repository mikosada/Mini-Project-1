import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { body } from 'express-validator';
import { registerValidator } from '../middleware/validator';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/regis',
      registerValidator,
      this.authController.registerUser,
    );
  }
  getRouter(): Router {
    return this.router;
  }
}
