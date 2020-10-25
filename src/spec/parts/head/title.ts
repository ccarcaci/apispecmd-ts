import { OpenAPIV3 } from 'openapi-types'
import { markdownReplacer } from 'src/util/markdownReplacer'
import { ReplacerKeyValueType } from 'src/util/replacer'

const title = (spec: OpenAPIV3.InfoObject): string => {
  const replacements: ReplacerKeyValueType[] = [
    { key: 'info.title', value: spec.title },
    { key:'info.version', value: spec.version },
  ]
  return markdownReplacer('markdown/templates/heading/title.md', replacements)
}

export { title }
