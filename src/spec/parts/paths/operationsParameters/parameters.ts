import { OpenAPIV3 } from 'openapi-types'
import { templateReplacer } from '../../../../util/markdownReplacer'

const parameters = (params: OpenAPIV3.ParameterObject[]): string => {
  if (params.length <= 0) {
    return ''
  }

  const parametersRows = params.map((param) => generateParameterRow(param)).join('\n')
  const parametersDescriptions = params.map((param) => generateParameterDescription(param)).join('\n')

  return `## Parameters

|Name|Type|In|Required|Deprecated|Explode|Allow Reserved|
|-|-|-|-|-|-|-|
${parametersRows}

**Parameters Descriptions**

${parametersDescriptions}
`
}

const parameterTableRowTemplate = '|{{name}}|{{type}}|{{in}}|{{required}}|{{deprecated}}|{{explode}}|{{allowReserved}}|'
const generateParameterRow = (param: OpenAPIV3.ParameterObject): string => {
  const templateReplacements = {
    name: param.name,
    type: '',
    in: param.in,
    required: 'no',
    deprecated: 'no',
    explode: 'no',
    allowReserved: 'no',
  }

  if ((param.schema as OpenAPIV3.SchemaObject)?.type) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    templateReplacements.type = (param.schema as OpenAPIV3.SchemaObject).type!
  }
  if (param.required) {
    templateReplacements.required = 'yes'
  }
  if (param.deprecated) {
    templateReplacements.deprecated = 'yes'
  }
  if (param.explode) {
    templateReplacements.explode = 'yes'
  }
  if (param.allowReserved) {
    templateReplacements.allowReserved = 'yes'
  }

  return templateReplacer(parameterTableRowTemplate, templateReplacements)
}

const parameterDescriptionTemplate = '* {{name}}: {{description}}'
const generateParameterDescription = (param: OpenAPIV3.ParameterObject): string => {
  let description = 'No description provided'

  if (param.description) {
    description = param.description
  }

  const templateReplacements = {
    name: param.name,
    description,
  }

  return templateReplacer(parameterDescriptionTemplate, templateReplacements)
}

export { parameters }
