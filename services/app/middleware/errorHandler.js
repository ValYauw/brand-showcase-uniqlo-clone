function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errors = null;

  switch (err.name) {

    case "InvalidLogin":
      statusCode = 401;
      message = "Invalid username/password"
      break;
    case "JsonWebTokenError":
      statusCode = 401;
      message = "Invalid token"
      break;
    case "Unauthorized":
      statusCode = 401;
      message = "Invalid token"
      break;
    case "TokenExpiredError":
      statusCode = 401;
      message = "Token has expired"
      break;

    case "Forbidden":
      statusCode = 403;
      message = "Forbidden access"
      break;

    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      statusCode = 400;
      message = "Validation Error";
      errors = err.errors.map((el) => el.message);
      break;
    
    case "BadCredentials":
      statusCode = 400;
      message = "Bad Input Credentials";
      break;

    case "NotFoundError":
      statusCode = 404;
      message = 'Data not found';
      break;

    default:
      console.log(err);
  }

  let JSONResponse = {statusCode, message};
  if (errors) JSONResponse.errors = errors;
  res.status(statusCode).json(JSONResponse);
}

module.exports = errorHandler;
