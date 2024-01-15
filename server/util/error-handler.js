class ExtendedError extends Error {
    constructor(message, list) {
      super(message);
      this.name = this.constructor.name;
      this.list = list;
    }
}

module.exports = { ExtendedError };