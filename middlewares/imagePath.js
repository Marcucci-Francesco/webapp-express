const imagePath = (req, res, next) => {
  req.imagePath = `${req.protocol}://${req.get('host')}/img/`;
  next()
}


export default imagePath