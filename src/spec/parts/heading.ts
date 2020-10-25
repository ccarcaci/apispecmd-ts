import { WriteStream } from 'fs'
import { OpenAPIV3 } from 'openapi-types'

import { title } from './head/title'
import { description } from './head/description'
import { servers } from './head/servers'

const heading = (writeStream: WriteStream, spec: OpenAPIV3.Document): void => {
  writeStream.write(title(spec.info))
  writeStream.write(description(spec.info))
  writeStream.write(servers(spec.servers))
}

export { heading }
