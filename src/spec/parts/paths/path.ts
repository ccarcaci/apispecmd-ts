import { OpenAPIV3 } from 'openapi-types'
import { operationRequestBody } from './operationRequestBody'
import { parameters } from './operationsParameters/parameters'
import { removeDuplicatedParameters } from './operationsParameters/removeDuplicatedParameters'
import { renderSecurityScheme } from './renderSecurityScheme'
import { tags } from './tags'
import { title } from './title'
import { OperationType } from './types/OperationType'

const path = (operation: OperationType): string => {
  const securitySchemes = operation.security.map((sec) => renderSecurityScheme(sec)).join('\n\n')
  const params = removeDuplicatedParameters(
    operation.parameters, operation.operationObject.parameters as OpenAPIV3.ParameterObject[])

  let pathDescription = title(operation)
  pathDescription = `${pathDescription}\n\n${tags(operation.tags)}`
  pathDescription = `${pathDescription}\n\n${securitySchemes}`
  pathDescription = `${pathDescription}\n\n${parameters(params)}`
  pathDescription = `${pathDescription}\n\n`

  if(operation.operationObject.requestBody) {
    pathDescription = `${pathDescription}${operationRequestBody(
      operation.operationObject.requestBody as OpenAPIV3.RequestBodyObject)}`
  }

  return pathDescription
}

export { path }
