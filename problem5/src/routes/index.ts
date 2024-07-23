import { Router } from 'express';
import PostController from '../controllers/postController';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello World' });
});

routes.post('/posts', PostController.store);
routes.get('/posts', PostController.index);
routes.get('/posts/:id', PostController.show);
routes.put('/posts/:id', PostController.update);
routes.delete('/posts/:id', PostController.destroy);

export default routes;
