import { OpenAPIV3 } from 'openapi-types'
import { replacer } from '../../../../../util/replacer'

// eslint-disable-next-line max-len
const tableTemplate = `|Name|Required|Type|Format|Default|Minimum|Exclusive Minimum|Maximum|Exclusive Maximum|Min Length|Max Length|Unique Items|Pattern|Nullable|Read Only|Write Only|Deprecated|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
{{tableRows}}`
const generateTable = (properties: {[ name: string ]: OpenAPIV3.SchemaObject }, required?: string[]): string => {
  const isRequired = generateIsRequired(required)
  const propertiesNames = Object.keys(properties)
  const tableRows = propertiesNames
    // eslint-disable-next-line security/detect-object-injection
    .map((propertyName) => generateRow(propertyName, properties[propertyName], isRequired(propertyName)))
    .join('\n')
  const tableReplacements = { tableRows }
  return replacer(tableTemplate, tableReplacements)
}
const generateIsRequired = (required?: string[]) => (propertyName: string): boolean =>
  required !== undefined && required.includes(propertyName)

// eslint-disable-next-line max-len
const rowTemplate = '|{{name}}|{{required}}|{{type}}|{{format}}|{{default}}|{{minimum}}|{{exclusiveMinimum}}|{{maximum}}|{{exclusiveMaximum}}|{{minLength}}|{{maxLength}}|{{uniqueItems}}|{{pattern}}|{{nullable}}|{{readOnly}}|{{writeOnly}}|{{deprecated}}|'
const generateRow = (name: string, property: OpenAPIV3.SchemaObject, required: boolean): string => {
  const propertyItemsType = getPropertyItemsType(property)
  const rowReplacements = {
    name,
    required,
    type: getPropertyType(property.type, propertyItemsType),
    format: property.format,
    default: property.default,
    minimum: property.minimum,
    exclusiveMinimum: property.exclusiveMinimum,
    maximum: property.maximum,
    exclusiveMaximum: property.exclusiveMaximum,
    minLength: property.minLength ?? property.minItems,
    maxLength: property.maxLength ?? property.maxItems,
    pattern: property.pattern,
    uniqueItems: property.uniqueItems,
    nullable: property.nullable,
    readOnly: property.readOnly,
    writeOnly: property.writeOnly,
    deprecated: property.deprecated,
  }
  return replacer(rowTemplate, rowReplacements)
}
const getPropertyType = (
  propertyType?: OpenAPIV3.ArraySchemaObjectType | OpenAPIV3.NonArraySchemaObjectType,
  itemsType?: OpenAPIV3.ArraySchemaObjectType | OpenAPIV3.NonArraySchemaObjectType): string => {
  if(!propertyType) { return '' }
  if(propertyType === 'object') { return 'object (See related table)' }
  if(propertyType === 'array' && !itemsType) { return 'array' }
  if(propertyType === 'array' && itemsType === 'object') { return 'array of objects (See related table)' }
  if(propertyType === 'array' && itemsType) { return `array of ${itemsType}s` }
  return propertyType
}
const getPropertyItemsType = (property: OpenAPIV3.SchemaObject):
OpenAPIV3.ArraySchemaObjectType | OpenAPIV3.NonArraySchemaObjectType | undefined => {
  const propertyArraySchemaObject: OpenAPIV3.ArraySchemaObject = property as OpenAPIV3.ArraySchemaObject
  if(!propertyArraySchemaObject.items) { return }

  return (propertyArraySchemaObject.items as OpenAPIV3.SchemaObject).type
}

const enumsTemplate = `#### Enums

{{enums}}`
const generateEnums = (properties: {[ name: string ]: OpenAPIV3.SchemaObject }): string => {
  if(!thereAreEnums(properties)) { return '' }

  const propertiesNames = Object.keys(properties)
  const enums = propertiesNames.map((propertyName) => {
    // eslint-disable-next-line security/detect-object-injection
    const property = properties[propertyName]

    if(!property.enum) { return }

    return generateEnumRow(propertyName, property.enum)
  })
    .filter((enumRow) => enumRow)
    .join('\n')
  const enumsReplacements = { enums }

  return replacer(enumsTemplate, enumsReplacements)
}
const thereAreEnums = (properties: {[ name: string ]: OpenAPIV3.SchemaObject }): boolean => {
  const propertiesNames = Object.keys(properties)
  return propertiesNames
    // eslint-disable-next-line security/detect-object-injection
    .map((propertyName) => properties[propertyName])
    .some((property) => property.enum)
}

const enumRowTemplate = '* {{propertyName}}: {{elements}}'
const generateEnumRow = (propertyName: string, elements: unknown[]): string => {
  const enumRowReplacements = {
    propertyName,
    elements: JSON.stringify(elements),
  }
  return replacer(enumRowTemplate, enumRowReplacements)
}

export { generateTable, generateEnums }
