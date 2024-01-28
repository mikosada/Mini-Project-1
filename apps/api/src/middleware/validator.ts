import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import fs from 'fs';

export const registerValidator = [
  body('username').notEmpty().withMessage('Username required'),
  body('email').notEmpty().withMessage('Email required'),
  body('email').isEmail().withMessage('Input email properly'),
  body('password').notEmpty().withMessage('Password required'),
  body('password')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage('Password min 8, with number'),
  (req: Request, res: Response, next: NextFunction) => {
    const errorValidator = validationResult(req);
    if (!errorValidator.isEmpty()) {
      return res.status(400).send({ error: errorValidator.array() });
    }
    next();
  },
];

export const createEventValidator = [
  body('name').notEmpty().withMessage('Name required'),
  body('price').notEmpty().withMessage('Price required'),
  body('time').notEmpty().withMessage('Time required'),
  body('date').notEmpty().withMessage('Date required'),
  body('description').notEmpty().withMessage('Description required'),
  body('location').notEmpty().withMessage('Location required'),
  body('type').notEmpty().withMessage('Type required'),
  body('seat').notEmpty().withMessage('Seat required'),
  body('status').notEmpty().withMessage('Status required'),
  body('categoryId').notEmpty().withMessage('Category required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errorValidator = validationResult(req);
    if (!errorValidator.isEmpty()) {
      fs.unlink(`./public/assets/events/${req.file?.filename}`, () => {});
      return res.status(400).send({ error: errorValidator.array() });
    }
    next();
  },
];
