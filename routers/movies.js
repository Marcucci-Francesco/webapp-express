import express from 'express';
const router = express.Router();
import { index, show } from '../controllers/moviesController.js';

router.get('/', index);

router.get('/:id', show);

export default router