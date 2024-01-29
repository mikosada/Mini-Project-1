import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import { HOSTNAME, PORT } from './config';
import { SampleRouter } from './routers/sample.router';
import { EventsRouter } from './routers/events.router';
import { AuthRouter } from './routers/auth.router';
import { CategoriesRouter } from './routers/categories.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err);
          res.status(500).send(err);
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const sampleRouter = new SampleRouter();
    const authRouter = new AuthRouter();
    const eventsRouter = new EventsRouter();
    const categoriesRouter = new CategoriesRouter();

    this.app.get('/', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student !`);
    });

    this.app.use(express.static('public'));
    this.app.use('/api/auth', authRouter.getRouter());
    this.app.use('/api/samples', sampleRouter.getRouter());
    this.app.use('/api/events', eventsRouter.getRouter());
    this.app.use('/api/categories', categoriesRouter.getRouter());
  }

  public start(): void {
    this.app.listen(8000, HOSTNAME, () => {
      console.log(`  ➜  [API] Local:   http://${HOSTNAME}:${PORT}/`);
    });
  }
}
