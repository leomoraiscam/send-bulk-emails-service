export class InvalidSecurityPasswordError extends Error {
  constructor() {
    super(`The password must be encrypted`);
    this.name = 'InvalidSecurityPasswordError';
  }
}
