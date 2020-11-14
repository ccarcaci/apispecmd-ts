import { WriteStream } from 'fs'
import { OpenAPIV3 } from 'openapi-types'

import { operationsMapper } from './paths/operationsMapper'
import { path } from './paths/path'

const paths = (writeStream: WriteStream, spec: OpenAPIV3.Document): void => operationsMapper(spec)
  .map((operation) => path(operation))
  .forEach((pathMarkdown) => writeStream.write(pathMarkdown))

export { paths }
