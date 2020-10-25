import { OpenAPIV3 } from 'openapi-types'
import { markdownReplacer } from 'src/util/markdownReplacer'
import { ReplacerKeyValueType } from 'src/util/replacer'

const server = (spec: OpenAPIV3.ServerObject): string => {
  const replacer: ReplacerKeyValueType[] = [
    {
      key: 'description',
      value: spec.description ? `${spec.description} | ` : '',
    },
    {
      key: 'url',
      value: spec.url,
    },
  ]

  return markdownReplacer('markdown/templates/heading/server.md', replacer)

}

export { server }
