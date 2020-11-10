import { WriteStream } from 'fs'
import { OpenAPIV3 } from 'openapi-types'

const paths = (writeStream: WriteStream, spec: OpenAPIV3.Document): void => {
  writeStream
  spec.paths
}

export { paths }
