import { OpenAPIV3 } from 'openapi-types'
import { templateReplacer } from '../../../util/markdownReplacer'
import { ReplacerKeyValueType } from '../../../util/replacer'

const descriptionTemplate = '{{info.description}}'

const description = (spec: OpenAPIV3.InfoObject): string => {
  const replacements: ReplacerKeyValueType = { 'info.description': spec.description ?? '' }
  return templateReplacer(descriptionTemplate, replacements)
}

export { description }
