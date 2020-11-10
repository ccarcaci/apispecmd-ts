import { OpenAPIV3 } from 'openapi-types'
import { templateReplacer } from 'src/util/markdownReplacer'
import { ReplacerKeyValueType } from 'src/util/replacer'

const serverTemplate = '- {{description}}[{{url}}]({{url}})'

const server = (spec: OpenAPIV3.ServerObject): string => {
  const replacer: ReplacerKeyValueType = {
    description: spec.description ? `${spec.description} | ` : '',
    url: spec.url,
  }

  return templateReplacer(serverTemplate, replacer)

}

export { server }
