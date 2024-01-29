import { Router } from 'express';
import { CategoriesController } from '@/controllers/categories.controller';

export class CategoriesRouter {
  private router: Router;
  private categoriesController: CategoriesController;

  constructor() {
    this.categoriesController = new CategoriesController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.categoriesController.getCategories);
  }

  getRouter(): Router {
    return this.router;
  }
}
