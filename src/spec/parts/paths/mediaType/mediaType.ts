import { OpenAPIV3 } from 'openapi-types'

import { schema } from './schema/schema'
import { templateReplacer } from 'src/util/markdownReplacer'
import { EmptySchemaError } from './errors/EmptySchemaError'

const mediaTypeTemplate = `## {{mediaTypeTitle}} ({{mediaTypeName}})
{{mediaTypeDescription}}

{{propertiesTables}}

{{mediaTypeExample}}
`

const mediaType = (mediaTypeName: string, mediaTypeObject: OpenAPIV3.MediaTypeObject): string => {
  const baseMediaType: OpenAPIV3.NonArraySchemaObject = mediaTypeObject.schema as OpenAPIV3.NonArraySchemaObject

  if(!baseMediaType) {
    throw new EmptySchemaError()
  }

  const propertiesCast = baseMediaType.properties as { [name: string]: OpenAPIV3.SchemaObject }
  const propertiesTables = properties(propertiesCast, baseMediaType.required).join('\n\n')
  const mediaTypeExample = generateMediaTypeExample(baseMediaType.title, mediaTypeObject.example)
  const templateReplacements = {
    mediaTypeName,
    mediaTypeTitle: baseMediaType.title ?? '',
    mediaTypeDescription: baseMediaType.description ?? '',
    propertiesTables,
    mediaTypeExample,
  }

  return templateReplacer(mediaTypeTemplate, templateReplacements)
}

// # ## ### ##### ########

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
