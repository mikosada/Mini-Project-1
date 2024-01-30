import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';

export class DashboardRouter {
  private router: Router;
  private dashboardController: DashboardController;

  constructor() {
    this.dashboardController = new DashboardController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/attendees', this.dashboardController.attendees);
    this.router.get('/transaction', this.dashboardController.transactions);
    this.router.get('/total', this.dashboardController.totalRevenue);
    this.router.get('/discount', this.dashboardController.getCoupon);
  }

  getRouter(): Router {
    return this.router;
  }
}
