function delay(req, res, next) {
  setTimeout(() => {
    next();
  }, 800)
}

module.exports = delay;