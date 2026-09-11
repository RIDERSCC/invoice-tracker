const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // log the full error server-side for debugging

  // Sequelize-specific errors get recognized and mapped to proper status codes
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: err.errors[0].message });
  }

  // Default fallback for anything unexpected
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ error: err.message || 'Something went wrong' });
};

module.exports = errorHandler;