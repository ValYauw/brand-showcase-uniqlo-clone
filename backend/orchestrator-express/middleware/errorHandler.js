function errorHandler(err, req, res, next) {
  let statusCode = err?.response?.status || 500;
  let jsonResponse = err?.response?.data || { message: "Internal Server Error" };
  res.status(statusCode).json(jsonResponse);
}

module.exports = errorHandler;
