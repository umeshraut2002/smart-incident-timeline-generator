const notFoundHandler = (_req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
};

const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.code === "ENOENT" ? 404 : error.statusCode || 500;

  res.status(statusCode).json({
    error: error.message || "Unexpected server error"
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};
