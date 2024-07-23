import express from 'express';
import PostController from '../controllers/postController';

const router = express.Router();

router.get('/', async (req, res) => {
  const { keyword = '' } = req.query;
  const controller = new PostController();
  const response = await controller.index(String(keyword));
  return res.send(response);
});

router.post('/', async (req, res) => {
  const controller = new PostController();
  const response = await controller.store(req.body);
  return res.send(response);
});

router.put('/:id', async (req, res) => {
  const controller = new PostController();
  const response = await controller.update(req.params.id, req.body);
  if (!response) {
    return res.status(404).send({ message: 'No post found' });
  }
  return res.send(response);
});

router.get('/:id', async (req, res) => {
  const controller = new PostController();
  const response = await controller.show(req.params.id);
  if (!response) {
    return res.status(404).send({ message: 'No post found' });
  }
  return res.send(response);
});

router.delete('/:id', async (req, res) => {
  const controller = new PostController();
  const response = await controller.destroy(req.params.id);
  if (!response) {
    return res.status(404).send({ message: 'No post found' });
  }
  return res.send(response);
});

export default router;
