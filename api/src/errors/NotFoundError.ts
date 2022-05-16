export default class NotFoundError extends Error {
  public name = "NotFoundError";

  constructor() {
    super("Resource not found");
  }
}
