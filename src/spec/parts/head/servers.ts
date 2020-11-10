import { OpenAPIV3 } from 'openapi-types'
import { templateReplacer } from 'src/util/markdownReplacer'
import { ReplacerKeyValueType } from 'src/util/replacer'

import { server } from './server'

const serverMarkdownTemplate = `## Servers

{{serversPart}}`

const servers = (spec: OpenAPIV3.ServerObject[] | undefined): string => {
  if(!spec) { return '' }

  const replacer: ReplacerKeyValueType = {
    serversPart: spec.map((serverPart: OpenAPIV3.ServerObject) => server(serverPart)).join('\n\n'),
  }

  return templateReplacer(serverMarkdownTemplate, replacer)
}

export { servers }
