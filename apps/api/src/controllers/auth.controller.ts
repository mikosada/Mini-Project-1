import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';
import { genSalt, hash, compare } from 'bcrypt';
import { transporter } from '../helpers/mailer';
import fs from 'fs';
import { join } from 'path';
import handlebars from 'handlebars';
import { verify, sign } from 'jsonwebtoken';

export class AuthController {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, role, parentReferral } = req.body;
      const checkUser = await prisma.user.findUnique({
        where: { email },
      });
      if (checkUser) {
        throw new Error('Email already exist');
      }

      const generateReferral = () => {
        const chars = 'ABCDEFGHIJ12345';
        const codeLength = 6;
        let referralCode = '';

        for (let i = 0; i < codeLength; i++) {
          const random = Math.floor(Math.random() * chars.length);
          referralCode += chars.charAt(random);
        }
        return referralCode;
      };

      const salt = await genSalt(10);
      const hashPassword = await hash(req.body.password, salt);

      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashPassword,
          referralCode: generateReferral(),
          role,
        },
      });

      const generateCouponCode = () => {
        const chars = 'ABCDEFGHIJ12345';
        const codeLength = 8;
        let couponCode = '';

        for (let i = 0; i < codeLength; i++) {
          const random = Math.floor(Math.random() * chars.length);
          couponCode += chars.charAt(random);
        }
        return couponCode;
      };

      const calculateExpiryDate = (): Date => {
        const currentDate = new Date();
        const expiryDate = new Date(currentDate);
        expiryDate.setMonth(currentDate.getMonth() + 3);

        return expiryDate;
      };

      if (parentReferral) {
        const referralCode = parentReferral;

        const referringUser = referralCode
          ? await prisma.user.findUnique({ where: { referralCode } })
          : null;

        if (referringUser) {
          const awardPoints = async (
            userId: number,
            pointsToAdd: number,
            expiresAt: Date,
          ) => {
            try {
              const currentUser = await prisma.user.findUnique({
                where: { id: userId },
                include: { points: true },
              });
              if (!currentUser) {
                throw new Error('User Not Found');
              }
              const currentPoints = currentUser.points.reduce(
                (totalPoints, point) => totalPoints + point.points,
                0,
              );
              const newTotalPoints = currentPoints + pointsToAdd;

              if (currentUser.points.length > 0) {
                await prisma.user.update({
                  where: { id: userId },
                  data: {
                    points: {
                      update: {
                        where: {
                          id: currentUser.points[0].id,
                        },
                        data: { points: newTotalPoints, expiresAt },
                      },
                    },
                  },
                });
              } else {
                await prisma.user.update({
                  where: { id: userId },
                  data: {
                    points: { create: { points: newTotalPoints, expiresAt } },
                  },
                });
              }

              console.log('point successfuly added');
            } catch (error) {
              console.error('Error awarding points', error);
            }
          };

          const generateDiscountCoupon = async (
            userId: number,
            couponCode: string,
            expirationDate: Date,
            discountPercentage: number,
          ) => {
            try {
              const discountCoupon = await prisma.discountCoupon.create({
                data: {
                  userId,
                  couponCode,
                  expirationDate,
                  discountPercentage,
                },
              });
              console.log('Discount coupon successfuly added');
            } catch (error) {
              console.error('Error creating discount coupon', error);
              throw error;
            }
          };

          const pointsToAdd = 10000;
          await awardPoints(
            referringUser.id,
            pointsToAdd,
            calculateExpiryDate(),
          );
          const discountPercentage = 10;
          await generateDiscountCoupon(
            newUser.id,
            generateCouponCode(),
            calculateExpiryDate(),
            discountPercentage,
          );
        }
      }

      const templateSource = fs.readFileSync(
        join(__dirname, '../templates/registerMail.hbs'),
        'utf-8',
      );
      const compiledTemplate = handlebars.compile(templateSource);

      await transporter.sendMail({
        from: 'Ticket',
        to: req.body.email,
        subject: `Welcome, ${req.body.username}`,
        html: compiledTemplate({ name: req.body.username }),
      });

      console.log(newUser);
      return res.status(201).send({ success: true, result: newUser });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: req.body.email },
      });

      if (!user) {
        throw new Error('Email user not found');
      }

      const checkPassword = await compare(req.body.password, user.password);

      if (checkPassword) {
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          referral: user.referralCode,
        };

        const secret = '123jwt';
        const expired = 60 * 60 * 1;
        const token = sign(payload, secret, { expiresIn: expired });

        return res.status(200).send({
          token: token,
        });
      } else {
        return res.status(403).send('WRONG PASSWORD');
      }
    } catch (error) {
      next(error);
    }
  }

  async keepLogin(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
