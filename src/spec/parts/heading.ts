import { Writable } from 'stream'
import { OpenAPIV3 } from 'openapi-types'

import { title } from './head/title'
import { description } from './head/description'
import { servers } from './head/servers'
import { apiSupport } from './head/apiSupport'
import { license } from './head/license'
import { termsOfService } from './head/termsOfService'

const heading = (writeStream: Writable, spec: OpenAPIV3.Document): void => {
  writeStream.write(title(spec.info))
  writeStream.write('\n\n')
  writeStream.write(description(spec.info))
  writeStream.write('\n\n')
  writeStream.write(servers(spec.servers))
  writeStream.write('\n\n')
  writeStream.write(apiSupport(spec.info.contact))
  writeStream.write('\n\n')
  writeStream.write(license(spec.info.license))
  writeStream.write('\n\n')
  writeStream.write(termsOfService(spec.info.termsOfService))
  writeStream.write('\n\n')
}

export { heading }
