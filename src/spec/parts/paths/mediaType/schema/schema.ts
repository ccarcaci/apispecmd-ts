import { OpenAPIV3 } from 'openapi-types'
import { replacer } from '../../../../../util/replacer'
import { generateEnums, generateTable } from './tableEnums'

const schemaPartTemplate = `#### {{sectionName}}

{{schemaTable}}

{{schemaEnums}}`

const schema = (
  sectionName: string,
  properties: { [name: string]: OpenAPIV3.SchemaObject },
  required?: string[]
): string[] => {
  if (hasNoKeys(properties)) {
    return []
  }
  const schemaTable = generateTable(properties, required)
  const schemaEnums = generateEnums(properties)
  const schemaReplacements = {
    sectionName,
    schemaTable,
    schemaEnums,
  }
  const schemaPart = replacer(schemaPartTemplate, schemaReplacements)
  const subObjectsSchemas: string[] = generateSubObjectsSchemas(sectionName, properties)

  return [schemaPart, ...subObjectsSchemas]
}

// # ## ### ##### ########

const generateSubObjectsSchemas = (
  parentSectionName: string,
  properties: { [name: string]: OpenAPIV3.SchemaObject }
): string[] => {
  const propertiesNames = Object.keys(properties)
  return propertiesNames.flatMap((propertyName) => {
    // eslint-disable-next-line security/detect-object-injection
    const property = properties[propertyName]

    if (property.type === 'object' && property.properties) {
      return schema(
        `${parentSectionName} -> ${propertyName}`,
        property.properties as { [name: string]: OpenAPIV3.SchemaObject },
        property.required
      )
    }
    if (property.type === 'array' && (property.items as OpenAPIV3.SchemaObject).type === 'object') {
      const propertyItems = property.items as OpenAPIV3.SchemaObject
      return schema(
        `${parentSectionName} -> ${propertyName} array`,
        propertyItems.properties as { [name: string]: OpenAPIV3.SchemaObject },
        propertyItems.required
      )
    }
    if (property.type === 'array' && (property.items as OpenAPIV3.SchemaObject).type === 'array') {
      return schema(`${parentSectionName} -> ${propertyName} items`, {
        [propertyName]: { ...(property.items as OpenAPIV3.SchemaObject) },
      })
    }

    return []
  })
}

const hasNoKeys = (properties: { [name: string]: OpenAPIV3.SchemaObject }): boolean =>
  Object.keys(properties).length <= 0

// # ## ### ##### ########

export { schema }
