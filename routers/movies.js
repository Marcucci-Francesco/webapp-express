import express from 'express';
const router = express.Router();
import { index, show, store, storeNewMovie } from '../controllers/moviesController.js';
import upload from '../middlewares/multer.js';

router.get('/', index);

router.get('/:id', show);

router.post('/:id/reviews', store)

router.post('/', upload.single('image'), storeNewMovie)

export default router