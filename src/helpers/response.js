export { ErrorHandler, handleResponse, handleError };

class ErrorHandler extends Error {
  constructor(status, message, code) {
    super();
    this.status = status;
    this.message = message;
    this.code = code;
  }
}

const handleError = (error) => {
  if (error instanceof ErrorHandler) {
    return error;
  }
  throw error;
};

const handleResponse = (status, message, code, data = null) => {
  return { status, message, code, data };
};
