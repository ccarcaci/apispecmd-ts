type ReplacerKeyValueType = {
  [key: string]: string | number | boolean | null | undefined,
}

const replacer = (sourceText: string, keyValues?: ReplacerKeyValueType): string => {
  let transformedSourceText = sourceText.split(/{{ +/).join('{{')
  transformedSourceText = transformedSourceText.split(/ +}}/).join('}}')
  transformedSourceText = transformedSourceText.split('{{}}').join('')

  if(!keyValues ) { return transformedSourceText }

  const keys = Object.keys(keyValues)

  if(keys.length <= 0) { return transformedSourceText }
  if(keys.length > 1) {
    // eslint-disable-next-line security/detect-object-injection
    return keys.reduce((accumulator, key) => replacer(accumulator, { [key]: keyValues[key] }), transformedSourceText)
  }

  const key = keys[0]
  // eslint-disable-next-line security/detect-object-injection
  const value = stringifyValue(keyValues[key])

  return transformedSourceText
    .split(`{{${key}}}`)
    .join(value)
    .replace(/\[\]/g, '')
    .replace(/ \(\)/g, '()')
    .replace(/\(\)/g, '')
    .replace(/  +/g, ' ')
    .replace(/ +\n/g, '\n')
    .replace(/\n\n\n+/g, '\n\n')
    .replace(/\n+$/g, '')
}

// # ## ### ##### ########

const stringifyValue = (value: string | number | boolean | null | undefined): string => {
  if(value === null || value === undefined) { return '' }
  return `${value}`
}

// # ## ### ##### ########

export { replacer, ReplacerKeyValueType }
