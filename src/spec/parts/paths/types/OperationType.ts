import { OpenAPIV3 } from 'openapi-types'

type OperationType = {
  verb: string,
  path: string,
  summary?: string,
  description?: string,
  parameters?: OpenAPIV3.ParameterObject[],
  operationObject: OpenAPIV3.OperationObject,
}

export { OperationType }
