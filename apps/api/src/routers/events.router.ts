import { EventsController } from '@/controllers/events.controller';
import { uploader } from '@/middleware/uploader';
import { Router } from 'express';
import { createEventValidator } from '@/middleware/validator';

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
    this.router.post(
      '/',
      uploader('IMG', '/assets/events').single('img'),
      createEventValidator,
      this.eventsController.createEvent,
    );
    this.router.get('/:slug', this.eventsController.getEventBySlug);

    this.router.delete('/:id', this.eventsController.deleteEventById);
  }

  getRouter(): Router {
    return this.router;
  }
}
