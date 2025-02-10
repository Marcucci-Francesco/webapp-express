import express from 'express';
const router = express.Router();
import { index, show, store } from '../controllers/moviesController.js';

router.get('/', index);

router.get('/:id', show);

router.post('/:id/reviews', store)

export default router