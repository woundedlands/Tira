export class TiraError extends Error {
  constructor(message: string) {
    super("Tira error: " + message)
  }
}
