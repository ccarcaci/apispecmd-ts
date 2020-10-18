import fs from 'fs'
import { replacer, ReplacerKeyValueType } from './replacer'

const markdownReplacer = (templatePath: string, keyValues?: ReplacerKeyValueType | ReplacerKeyValueType[]): string => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const content = fs.readFileSync(templatePath, 'utf-8')

  return replacer(content, keyValues)
}

export { markdownReplacer }
