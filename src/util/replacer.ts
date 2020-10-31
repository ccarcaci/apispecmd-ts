type ReplacerKeyValueType = {
  key: string,
  value: string,
}

const replacer = (sourceText: string, keyValues?: ReplacerKeyValueType | ReplacerKeyValueType[]): string => {
  let transformedSourceText = sourceText.split(/{{ +/).join('{{')
  transformedSourceText = transformedSourceText.split(/ +}}/).join('}}')
  transformedSourceText = transformedSourceText.split('{{}}').join('')

  if(!keyValues) { return transformedSourceText }

  if(Array.isArray(keyValues)) {
    return keyValues.reduce((accumulator, keyValue) => replacer(accumulator, keyValue), transformedSourceText)
  }

  return transformedSourceText
    .split(`{{${keyValues?.key}}}`)
    .join(keyValues?.value)
    .replace(/\[\]/g, '')
    .replace(/\(\)/g, '')
    .replace(/  +/g, ' ')
}

export { replacer, ReplacerKeyValueType }
