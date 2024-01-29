import { NextFunction, Request, Response } from 'express';

import prisma from '@/prisma';
import { nameToSlug } from '@/utils/slug';
import { MediaType } from '@prisma/client';
import fs from 'fs';

export class EventsController {
  async getEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const events = await prisma.event.findMany({
        include: { medias: { select: { url: true } } },
      });

      const data = events.map((data) => {
        return {
          ...data,
          medias: data.medias.map((media) => {
            console.log(req.get('host'));

            return { url: `${req.get('host')}/${media.url}` };
          }),
        };
      });
      return res.status(200).send({ data });
    } catch (error) {
      next(error);
    }
  }

  async getEventBySlug(req: Request, res: Response) {
    const { slug } = req.params;

    const event = await prisma.event.findUnique({
      where: { slug: slug },
    });

    if (!event) {
      return res
        .status(404)
        .json({ success: true, message: 'Event not found' });
    }

    return res.status(200).json({ success: true, data: event });
  }

  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        name,
        price,
        time,
        date,
        description,
        location,
        type,
        seat,
        status,
        categoryId,
      } = req.body;

      const slug = nameToSlug(name);

      const existSlug = await prisma.event.findUnique({
        where: {
          slug,
        },
      });

      if (existSlug) {
        return res.status(401).send({
          success: false,
          message: 'Pastikan title tidak ada yang sama...',
        });
      }

      const event = {
        name,
        price,
        time,
        date,
        description,
        location,
        type,
        seat,
        status,
        categoryId,
      };

      await prisma.$transaction(async (tx) => {
        const newEvent = await tx.event.create({
          data: {
            name,
            slug,
            price: parseInt(price),
            time,
            date,
            description,
            location,
            type,
            seat: parseInt(seat),
            status,
            categoryId: parseInt(categoryId),
          },
        });

        await tx.media.create({
          data: {
            typeId: newEvent.id,
            type: MediaType.EVENT,
            url: `assets/events/${req.file?.filename}`,
          },
        });
      });

      return res
        .status(200)
        .send({ success: true, message: 'Data event berhasil di buat...' });
    } catch (error) {
      next({ success: false, message: error });
    }
  }

  async deleteEventById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const eventId = Number(id);
    if (isNaN(eventId)) {
      return res
        .status(400)
        .json({ success: false, message: 'event id is not valid' });
    }

    try {
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { medias: { select: { id: true, url: true } } },
      });

      if (!event) {
        return res
          .status(200)
          .json({ success: false, message: 'event not found' });
      }

      for (const media of event.medias) {
        const img = await prisma.media.findUnique({ where: { id: media.id } });
        if (!img) {
          return res
            .status(404)
            .send({ success: false, message: 'image not found' });
        }
        fs.unlink(`./public/${media.url}`, async (err) => {
          if (err) {
            return res
              .status(400)
              .json({ success: false, message: err.message });
          }
        });
      }

      await prisma.event.delete({ where: { id: eventId } });

      return res.status(200).send({ success: true, message: 'event deleted' });
    } catch (error) {
      next(error);
    }
  }
}
