class Err extends Error {
  constructor(message, type, ...params) {
    super(message, ...params);
    this.type = type;
    this.details = `https://err.sh/sergiodxa/micro-next/${type}`;
  }
}

export default Err;
