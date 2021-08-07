import { Writable } from 'stream'
import { OpenAPIV3 } from 'openapi-types'

import { operationsMapper } from './paths/operationsMapper'
import { path } from './paths/path'

const paths = (writeStream: Writable, spec: OpenAPIV3.Document): void =>
  operationsMapper(spec)
    .map((operation) => path(operation))
    .map((pathOperation) => `${pathOperation}\n\n`)
    .forEach((pathMarkdown) => writeStream.write(pathMarkdown))

export { paths }
