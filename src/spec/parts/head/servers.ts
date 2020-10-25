import { OpenAPIV3 } from 'openapi-types'
import { markdownReplacer } from 'src/util/markdownReplacer'
import { ReplacerKeyValueType } from 'src/util/replacer'

import { server } from './server'

const servers = (spec: OpenAPIV3.ServerObject[] | undefined): string => {
  if(!spec) { return '' }

  const replacer: ReplacerKeyValueType = {
    key: 'serversPart',
    value: spec.map((serverPart: OpenAPIV3.ServerObject) => server(serverPart)).join('\n\n'),
  }

  return markdownReplacer('markdown/templates/heading/servers.md', replacer)
}

export { servers }
