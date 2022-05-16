import {CastError} from "mongoose";

const ErrorHandlerMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err.name === "CastError") {
    res.status(400).send({
      status: 400,
      message: "Invalid request",
    });
    return next();
  }

  if (err.name === "NotFoundError") {
    res.status(404).send({
      status: 404,
      message: err.message,
    });
    return next();
  }

  console.log(err);
  res.status(500).send({
    status: 500,
    message: err.message
  });

  return next();
};

export default ErrorHandlerMiddleware;
