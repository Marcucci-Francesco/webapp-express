const notFound = (err, req, res, next) => {
  res.status(404)
  res.json({
    message: err.message,
    status: 404,
    error: 'Not Found'
  })
};

export default notFound