import { WriteStream } from 'fs'
import { OpenAPI } from 'openapi-types'

import { title } from './head/title'

const heading = (writeStream: WriteStream, spec: OpenAPI.Document): void => {
  writeStream.write(title(spec))
}

export { heading }
