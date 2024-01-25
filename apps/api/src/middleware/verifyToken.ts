import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return res.status(400).send({ message: 'Token not found' });
    }

    const verifiedToken = verify(token, '123jwt');
    if (!verifiedToken) {
      return res.status(401).send('Unauthorized token');
    }

    return res.status(200).send(verifiedToken);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
