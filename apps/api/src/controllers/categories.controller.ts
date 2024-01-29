import { NextFunction, Request, Response } from 'express';

import prisma from '@/prisma';

export class CategoriesController {
  async getCategories(_req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await prisma.category.findMany();
      return res.status(200).send({ success: true, data: categories });
    } catch (error) {
      next({ success: false, message: error });
    }
  }
}
