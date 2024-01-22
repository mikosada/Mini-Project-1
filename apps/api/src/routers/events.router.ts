import { EventsController } from '@/controllers/events.controller';
import { Router } from 'express';

export class EventsRouter {
  private router: Router;
  private eventsController: EventsController;

  constructor() {
    this.eventsController = new EventsController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.eventsController.getEvents);
    // this.router.get('/:id', this.sampleController.getSampleDataById);
    // this.router.post('/', this.sampleController.createSampleData);
  }

  getRouter(): Router {
    return this.router;
  }
}
