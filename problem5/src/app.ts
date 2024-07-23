import express from 'express';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';

class App {
  public server;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(express.static('public'));
    this.server.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        swaggerOptions: {
          url: '/swagger.json',
        },
      })
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
