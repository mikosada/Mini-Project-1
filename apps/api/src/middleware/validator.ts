import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

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
