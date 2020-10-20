import { OpenAPI } from 'openapi-types'
import { markdownReplacer } from 'src/util/markdownReplacer'
import { ReplacerKeyValueType } from 'src/util/replacer'

const description = (spec: OpenAPI.Document): string => {
  const replacements: ReplacerKeyValueType = {
    key: 'info.description',
    value: spec.info.description ?? '',
  }
  return markdownReplacer('markdown/templates/heading/description.md', replacements)
}

export { description }
