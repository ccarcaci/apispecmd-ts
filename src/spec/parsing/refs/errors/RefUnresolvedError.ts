export class RefUnresolvedError extends Error {
  constructor(public message: string) {
    super()
    this.name = 'RefUnresolvedError'
  }
}
