import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';
import { genSalt, hash, compare } from 'bcrypt';
import { transporter } from '../helpers/mailer';
import fs from 'fs';
import { join } from 'path';
import handlebars from 'handlebars';
import jwt from 'jsonwebtoken';

export class AuthController {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, role } = req.body;
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
          referral: generateReferral(),
          role,
        },
      });

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
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new Error('Email user not found');
      }

      const checkPassword = await compare(password, user.password);

      if (checkPassword) {
        const payload = {
          id: user.id,
          email: user.email,
          role: user.role,
        };

        const secret = '123jwt';
        const expired = 60 * 60 * 1;
        const token = jwt.sign(payload, secret, { expiresIn: expired });

        return res.json({
          data: { id: user.id, email: user.email },
          token: token,
        });
      } else {
        return res.status(403).send('WRONG PASSWORD');
      }
    } catch (error) {
      next(error);
    }
  }
}
