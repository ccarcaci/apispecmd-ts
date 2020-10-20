import { OpenAPI } from 'openapi-types'
import { markdownReplacer } from 'src/util/markdownReplacer'
import { ReplacerKeyValueType } from 'src/util/replacer'

const title = (spec: OpenAPI.Document): string => {
  const replacements: ReplacerKeyValueType[] = [
    { key: 'info.title', value: spec.info.title },
    { key:'info.version', value: spec.info.version },
  ]
  return markdownReplacer('markdown/templates/heading/title.md', replacements)
}

export { title }
