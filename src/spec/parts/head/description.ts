import { OpenAPIV3 } from 'openapi-types'
import { markdownReplacer } from 'src/util/markdownReplacer'
import { ReplacerKeyValueType } from 'src/util/replacer'

const description = (spec: OpenAPIV3.InfoObject): string => {
  const replacements: ReplacerKeyValueType = {
    key: 'info.description',
    value: spec.description ?? '',
  }
  return markdownReplacer('markdown/templates/heading/description.md', replacements)
}

export { description }
