module.exports = class QueroAPIError extends Error {
  constructor(message, code, data){
    super(message);
    this.responseData = data;
    this.responseStatusCode = code;
    return this;
  }
};
