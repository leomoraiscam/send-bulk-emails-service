export class InvalidSenderError extends Error {
  constructor() {
    super(`Sender does not exists.`);
    this.name = 'InvalidSenderError';
  }
}
