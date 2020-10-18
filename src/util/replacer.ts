type ReplacerKeyValueType = {
  key: string,
  value: string,
}

const replacer = (sourceText: string, keyValues?: ReplacerKeyValueType | ReplacerKeyValueType[]): string => {
  let transformedSourceText = sourceText.split(/{{\s+/).join('{{')
  transformedSourceText = transformedSourceText.split(/\s+}}/).join('}}')
  transformedSourceText = transformedSourceText.split('{{}}').join('')

  if(!keyValues) { return transformedSourceText }

  if(Array.isArray(keyValues)) {
    return keyValues.reduce((accumulator, keyValue) => replacer(accumulator, keyValue), transformedSourceText)
  }

  return transformedSourceText.split(`{{${keyValues?.key}}}`).join(keyValues?.value)
}

export { replacer, ReplacerKeyValueType }
