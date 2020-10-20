import { WriteStream } from 'fs'
import { OpenAPI } from 'openapi-types'

import { title } from './head/title'
import { description } from './head/description'

const heading = (writeStream: WriteStream, spec: OpenAPI.Document): void => {
  writeStream.write(title(spec))
  writeStream.write(description(spec))
}

export { heading }
