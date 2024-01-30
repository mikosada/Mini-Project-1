import { Request, Response, NextFunction } from 'express';
import prisma from '@/prisma';
import { resolve } from 'path';
import ResolvingViewport from 'next/dist/lib/metadata/types/metadata-interface.js';

export class DashboardController {
  async attendees(req: Request, res: Response, next: NextFunction) {
    try {
      const attendees = await prisma.transaction.findMany({
        include: { user: true },
      });
      return res.status(200).send({ success: true, data: attendees });
    } catch (error) {
      next({ success: false, message: error });
    }
  }

  async transactions(req: Request, res: Response, next: NextFunction) {
    try {
      const transaction = await prisma.transaction.findMany({
        include: { user: true },
      });
      return res.status(200).send({ success: true, data: transaction });
    } catch (error) {
      next({ success: false, message: error });
    }
  }
  async totalRevenue(req: Request, res: Response, next: NextFunction) {
    try {
      const transactionValue = await prisma.transaction.findMany({
        include: { event: { select: { price: true } } },
      });
      const totalRevenue = transactionValue.reduce(
        (acc, transaction) => acc + (transaction.event?.price || 0),
        0,
      );
      return res.status(200).send({ success: true, data: { totalRevenue } });
    } catch (error) {
      next({ success: false, message: error });
    }
  }

  async getCoupon(req: Request, res: Response, next: NextFunction) {
    try {
      const coupon = await prisma.discountCoupon.findMany({
        include: { user: true },
      });
      return res.status(200).send({ success: true, data: coupon });
    } catch (error) {
      next({ success: false, message: error });
    }
  }
}
