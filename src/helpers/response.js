export { ErrorHandler, handleResponse };

class ErrorHandler extends Error {
  constructor(status, message, code) {
    super();
    this.status = status;
    this.message = message;
    this.code = code;
  }
}

const handleResponse = (status, message, code, data = null) => {
  return { status, message, code, data };
};
