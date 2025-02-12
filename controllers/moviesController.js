import connection from "../data/db.js";
import path from "path";


const index = (req, res) => {
  const sql = `SELECT * FROM movies`

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message })

    const movies = results.map(movie => {
      return {
        ...movie,
        image: req.imagePath + movie.image
      }
    })
    res.json(movies)
  })
};

const show = (req, res) => {
  const id = req.params.id

  const sql = ` SELECT M.*, ROUND(AVG(R.vote)) AS average_vote
  FROM movies M
  LEFT JOIN reviews R ON M.id = R.movie_id
  WHERE M.id = ?`;

  const sqlReviews = `SELECT R.*
  FROM reviews R
  LEFT JOIN movies M ON M.id = R.movie_id
  WHERE M.id = ?`

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    if (results.length === 0) return res.status(404).json({ error: 'Film non trovato' })

    const movie = results[0];

    connection.query(sqlReviews, [id], (err, resultsReview) => {
      if (err) return res.status(500).json({ error: err.message })
      movie.reviews = resultsReview.length > 0 ? resultsReview : [];
      movie.image = req.imagePath + movie.image;
      res.json(movie)
    })
  })
};

const store = (req, res) => {
  const id = req.params.id
  const { name, vote, text } = req.body;
  console.log(req.body);


  const sql = `INSERT INTO reviews (name, vote, text, movie_id) VALUES (?, ?, ?, ?)`;

  connection.query(sql, [name, vote, text, id], (err, results) => {
    console.log(err);

    if (err) return res.status(500).json({ error: err.message })

    res.status(201).json({ message: 'Review added', id: results.insertId })
  })
}

const storeNewMovie = (req, res) => {

  const { title, director, genre, release_year, abstract } = req.body;

  const imageName = req.file.filename;

  const sql = 'INSERT INTO movies (title, director, genre, release_year, abstract, image) VALUES (?, ?, ?, ?, ?, ?)'

  connection.query(sql, [title, director, genre, release_year, abstract, imageName], (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.status(201).json({ status: 'success', message: 'Movie added' })
  }
  )
}

const destroy = (req, res) => {
  const id = req.params.id;

  const sqlImage = `SELECT image FROM movies WHERE id = ?`

  connection.query(sqlImage, [id], (err, results) => {
    const imageName = results[0].image;

    const imagePath = path.join(__dirname, '../public/img', imageName);

    fs.unlink(imagePath, cb());
  })

  const sqlDelete = `DELETE FROM movies WHERE id = ?`

  connection.query(sqlDelete, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ message: 'Film eliminato con successo' })
  })
}

export {
  index,
  show,
  store,
  storeNewMovie,
  destroy
}