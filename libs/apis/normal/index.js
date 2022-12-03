function ping(req, res) {
  res.status(204).send();
}

module.exports = {
  ping,
};
