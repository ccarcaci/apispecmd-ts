const isReference = (component: unknown): boolean =>
  component !== undefined && Object.prototype.hasOwnProperty.call(component, '$ref')

export { isReference }
