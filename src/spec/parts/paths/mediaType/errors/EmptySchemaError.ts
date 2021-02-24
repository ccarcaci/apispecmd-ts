export class EmptySchemaError extends Error {
  constructor() {
    super()
    this.name = 'EmptySchemaError'
  }
}
