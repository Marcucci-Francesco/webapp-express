const index = (req, res) => {
  res.send('Elenco film')
};

const show = (req, res) => {
  const id = req.params.id
  res.send(`Film con id = ${id}`)
};

export {
  index,
  show
}