import { OpenAPIV3 } from 'openapi-types'
import { templateReplacer } from 'src/util/markdownReplacer'
import { ReplacerKeyValueType } from 'src/util/replacer'

const titleTemplate = '# {{info.title}} ({{info.version}})'

const title = (spec: OpenAPIV3.InfoObject): string => {
  const replacements: ReplacerKeyValueType[] = [
    { key: 'info.title', value: spec.title },
    { key:'info.version', value: spec.version },
  ]
  return templateReplacer(titleTemplate, replacements)
}

export { title }
