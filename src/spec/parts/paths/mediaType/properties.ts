import { OpenAPIV3 } from 'openapi-types'

const propertiesTableTemplate = `|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
{{mediaTypeTable}}

### Enums
{{mediaTypeEnums}}`

const properties = (
  properties: {[ name: string ]: OpenAPIV3.SchemaObject },
  required?: string[]): string[] => {
  required
  properties
  propertiesTableTemplate

  return []
}

export { properties }
