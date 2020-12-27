const isReference = (component: unknown): boolean => Object.prototype.hasOwnProperty.call(component, '$ref')

export { isReference }
