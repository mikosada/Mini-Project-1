import { NextFunction, Request, Response } from 'express';

import prisma from '@/prisma';

export class EventsController {
  async getEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await prisma.event.findMany();
      return res.status(200).send({ data: events });
    } catch (error) {
      next(error);
    }
  }

  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, price, time, date, location } = req.body;
      //const data = { file: req.file, name: req.name };
      return res.status(200).send({ data: req.body });
    } catch (error) {
      next(error);
    }
  }
}
