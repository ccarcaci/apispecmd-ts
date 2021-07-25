import { idGenerator } from './idGenerator'

const determineOutputFileName = (inputFilePath: string, outputFilePath?: string): string => {
  if(outputFilePath) { return outputFilePath }

  const path = inputFilePath.replace(/.yaml$/, '')
  const identifier = idGenerator()

  return `${path}-${identifier}.md`
}

export { determineOutputFileName }
