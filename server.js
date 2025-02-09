import cors from 'cors';
import express from 'express';
import { env } from 'process';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

import movies from './routers/movies.js';
import errorHandler from './middlewares/errorsHandler.js';
import notFound from './middlewares/notFound.js';
import imagePath from './middlewares/imagePath.js';

app.use(express.json());
app.use(express.static('public'));
app.use(imagePath);
app.use(cors({ origin: "http://localhost:5173" }));


app.get('/', (req, res) => {
  res.send('Server pronto')
});

app.use('/movies', movies);

app.use(errorHandler);
app.use(notFound);


app.listen(port, () => {
  console.log(`Sono in ascolto alla porta ${port}`);
});