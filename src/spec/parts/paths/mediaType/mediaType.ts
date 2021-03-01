import { OpenAPIV3 } from 'openapi-types'

import { schema } from './schema/schema'
import { templateReplacer } from 'src/util/markdownReplacer'
import { EmptySchemaError } from './errors/EmptySchemaError'

const mediaTypeTemplate = `## {{mediaTypeTitle}} {{mediaTypeAggregation}} ({{mediaTypeName}})
{{mediaTypeDescription}}

{{propertiesTables}}

{{mediaTypeExample}}
`

const mediaType = (mediaTypeName: string, mediaTypeObject: OpenAPIV3.MediaTypeObject): string => {
  const baseMediaType: OpenAPIV3.NonArraySchemaObject = mediaTypeObject.schema as OpenAPIV3.NonArraySchemaObject
  let propertiesTables
  let mediaTypeAggregation = ''

  if(!baseMediaType) {
    throw new EmptySchemaError()
  }

  if(baseMediaType.allOf) {
    propertiesTables = generateAllOneAnyOf('aggregate all of', baseMediaType.allOf as OpenAPIV3.SchemaObject[])
    mediaTypeAggregation = 'all of the tables below'
  } else if(baseMediaType.oneOf) {
    propertiesTables = generateAllOneAnyOf('aggregate one of', baseMediaType.oneOf as OpenAPIV3.SchemaObject[])
    mediaTypeAggregation = 'one of the tables below'
  } else if(baseMediaType.anyOf) {
    propertiesTables = generateAllOneAnyOf('aggregate any of', baseMediaType.anyOf as OpenAPIV3.SchemaObject[])
    mediaTypeAggregation = 'any of the tables below'
  } else {
    propertiesTables = generateSchemaTables('Properties', baseMediaType)
  }

  const mediaTypeExample = generateMediaTypeExample(baseMediaType.title, mediaTypeObject.example)
  const templateReplacements = {
    mediaTypeName,
    mediaTypeAggregation,
    mediaTypeTitle: baseMediaType.title ?? '',
    mediaTypeDescription: baseMediaType.description ?? '',
    propertiesTables,
    mediaTypeExample,
  }

  return templateReplacer(mediaTypeTemplate, templateReplacements)
}

// # ## ### ##### ########

const generateAllOneAnyOf = (sectionName: string, aggregatedProperties: OpenAPIV3.SchemaObject[]): string =>
  aggregatedProperties.map((aggregated) =>
    generateSchemaTables(sectionName, aggregated as OpenAPIV3.NonArraySchemaObject)).join('\n\n')

const generateSchemaTables = (sectionName: string, baseMediaType: OpenAPIV3.NonArraySchemaObject): string => {
  const propertiesCast = baseMediaType.properties as { [name: string]: OpenAPIV3.SchemaObject }
  const propertiesTables = schema(sectionName, propertiesCast, baseMediaType.required).join('\n\n')

  return propertiesTables
}

const mediaTypeExampleTemplate = `### {{mediaTypeTitle}} Example

\`\`\`
{{mediaTypeExample}}
\`\`\``

const generateMediaTypeExample = (mediaTypeTitle?: string, mediaTypeExample?: {[key: string]: string}): string => {
  if(!mediaTypeExample) { return '' }
  return templateReplacer(mediaTypeExampleTemplate, {
    mediaTypeTitle: mediaTypeTitle ?? '',
    mediaTypeExample: JSON.stringify(mediaTypeExample, null, 2),
  })
}

// # ## ### ##### ########

export { mediaType }
