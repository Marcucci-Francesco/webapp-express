import express from 'express';
const router = express.Router();
import { index, show, store, storeNewMovie, destroy } from '../controllers/moviesController.js';
import upload from '../middlewares/multer.js';

router.get('/', index);

router.get('/:id', show);

router.post('/:id/reviews', store)

router.post('/', upload.single('image'), storeNewMovie)

router.delete('/:id', destroy);

export default router