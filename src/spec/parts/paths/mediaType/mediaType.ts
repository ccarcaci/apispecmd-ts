import { OpenAPIV3 } from 'openapi-types'

import { property } from './property'
import { templateReplacer } from 'src/util/markdownReplacer'

const mediaTypeTemplate = `## {{mediaTypeTitle}} ({{mediaTypeName}})
{{mediaTypeDescription}}

|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
{{mediaTypeTable}}

### Enums
{{mediaTypeEnums}}

## {{mediaTypeTitle}} Examples

\`\`\`
{{mediaTypeExamples}}
\`\`\`
`

const mediaType = (mediaTypeName: string, mediaTypeObject: OpenAPIV3.MediaTypeObject): string => {
  const schemaObject: OpenAPIV3.NonArraySchemaObject = mediaTypeObject.schema as OpenAPIV3.NonArraySchemaObject
  const schemaObjectProperties = schemaObject.properties as { [name: string]: OpenAPIV3.SchemaObject }
  const mediaTypeTable = generateMediaTypeTable(
    schemaObject.required ?? [],
    schemaObjectProperties ?? {})
  const templateReplacements = {
    mediaTypeName,
    mediaTypeTitle: schemaObject.title ?? '',
    mediaTypeDescription: schemaObject.description ?? '',
    mediaTypeTable,
  }

  return templateReplacer(mediaTypeTemplate, templateReplacements)
}

// # ## ### ##### ########

const generateMediaTypeTable = (
  requiredProperties: string[],
  properties: { [name: string]: OpenAPIV3.SchemaObject }): string => {
  const isRequired = generateIsRequiredFunction(requiredProperties)
  return Object.keys(properties).map((propertyName) => property(
    // eslint-disable-next-line security/detect-object-injection
    properties[propertyName],
    propertyName,
    isRequired(propertyName)))
    .join('\n')
}

const generateIsRequiredFunction = (requiredProperties: string[]) => (property: string): boolean =>
  requiredProperties.includes(property)

// # ## ### ##### ########

export { mediaType }
