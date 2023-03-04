// Extends the normal js error handler to be returned by the error-handling middleware
class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
    console.error(this.stack);
  }
}

module.exports = ExpressError;