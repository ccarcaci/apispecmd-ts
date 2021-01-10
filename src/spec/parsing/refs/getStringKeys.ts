type StringKeyReferencedType = { [ key: string ]: unknown }

const getStringKeys = (stringKeysObject: StringKeyReferencedType | undefined): string[] => {
  if(!stringKeysObject) { return [] }
  return Object.keys(stringKeysObject)
}

export { getStringKeys }
