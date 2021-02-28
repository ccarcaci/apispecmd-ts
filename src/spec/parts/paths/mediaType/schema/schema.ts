import { OpenAPIV3 } from 'openapi-types'
import { replacer } from '../../../../../util/replacer'
import { generateEnums, generateTable } from './tableEnums'

const schemaPartTemplate = `### {{sectionName}}

{{schemaTable}}

{{schemaEnums}}`

const schema = (
  sectionName: string,
  properties: {[ name: string ]: OpenAPIV3.SchemaObject },
  required?: string[]): string[] => {
  const schemaTable = generateTable(properties, required)
  const schemaEnums = generateEnums(properties)
  const schemaReplacements = {
    sectionName,
    schemaTable,
    schemaEnums,
  }
  const schemaPart = replacer(schemaPartTemplate, schemaReplacements)
  const subObjectsSchemas: string[] = generateSubObjectsSchemas(sectionName, properties)

  return [ schemaPart, ...subObjectsSchemas ]
}

// # ## ### ##### ########

const generateSubObjectsSchemas = (
  parentSectionName: string,
  properties: {[ name: string ]: OpenAPIV3.SchemaObject }): string[] => {
  const propertiesNames = Object.keys(properties)
  return propertiesNames
    .flatMap((propertyName) =>{
      const property = properties[propertyName]

      if(property.type === 'object' && property.properties) {
        return schema(
          `${parentSectionName} ${propertyName}`,
          property.properties as { [name: string]: OpenAPIV3.SchemaObject },
          property.required)
      }

      return []
    })
}

// # ## ### ##### ########

export { schema }
