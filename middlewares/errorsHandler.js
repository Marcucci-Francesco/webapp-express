const errorHandler = (err, req, res, next) => {
  res.status(500)
  res.json({
    message: err.message,
    status: 500,
    error: 'Internal error server'
  })
};

export default errorHandler