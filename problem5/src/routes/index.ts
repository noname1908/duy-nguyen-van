import { Router } from 'express';
import PostRouter from './post';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello World' });
});

routes.use('/posts', PostRouter);

export default routes;
