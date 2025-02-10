import connection from "../data/db.js";


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
      if (resultsReview.length === 0) return res.status(404).json({ error: 'Recensione non trovata' })

      movie.reviews = resultsReview;
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
    if (err) return res.status(500).json({ error: err.message })

    res.status(201).json({ message: 'Review added', id: results.insertId })
  })
}

export {
  index,
  show,
  store
}