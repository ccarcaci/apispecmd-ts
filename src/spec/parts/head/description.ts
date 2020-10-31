import { OpenAPIV3 } from 'openapi-types'
import { templateReplacer } from 'src/util/markdownReplacer'
import { ReplacerKeyValueType } from 'src/util/replacer'

const descriptionTemplate = '{{info.description}}'

const description = (spec: OpenAPIV3.InfoObject): string => {
  const replacements: ReplacerKeyValueType = {
    key: 'info.description',
    value: spec.description ?? '',
  }
  return templateReplacer(descriptionTemplate, replacements)
}

export { description }
