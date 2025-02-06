import express from 'express';
import { env } from 'process';
const app = express();
const port = process.env.PORT || 3000;

import movies from './routers/movies.js';


app.use(express.json());
app.get(express.static('public'));


app.get('/', (req, res) => {
  res.send('Server pronto')
});

app.use('/movies', movies);


app.listen(port, () => {
  console.log(`Sono in ascolto alla porta ${port}`);
});