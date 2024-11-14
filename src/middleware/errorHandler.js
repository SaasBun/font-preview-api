const { AppError } = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Handle unexpected errors
  console.error("Unexpected error:", err);
  res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

module.exports = errorHandler;
