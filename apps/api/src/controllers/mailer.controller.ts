import { Request, Response, NextFunction } from 'express';
import { transporter } from '../helpers/mailer';
import fs from 'fs';
import { join } from 'path';
import handlebars from 'handlebars';

export class mailController {
  async sendMailRegis(req: Request, res: Response, next: NextFunction) {
    try {
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
      next();
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
