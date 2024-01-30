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
import { SampleRouter } from './routers/sample.router';
import { EventsRouter } from './routers/events.router';
import { AuthRouter } from './routers/auth.router';
import { CategoriesRouter } from './routers/categories.router';
import { PORT } from './config';
import { DashboardRouter } from './routers/dashboard.router';

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
    const dashboardRouter = new DashboardRouter();

    this.app.get('/', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student !`);
    });

    this.app.use(express.static('public'));
    this.app.use('/api/auth', authRouter.getRouter());
    this.app.use('/api/samples', sampleRouter.getRouter());
    this.app.use('/api/events', eventsRouter.getRouter());
    this.app.use('/api/categories', categoriesRouter.getRouter());
    this.app.use('/api/dashboard', dashboardRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
