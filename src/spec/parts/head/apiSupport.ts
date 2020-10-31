import { OpenAPIV3 } from 'openapi-types'
import { templateReplacer } from 'src/util/markdownReplacer'
import { ReplacerKeyValueType } from 'src/util/replacer'

const apiSupportTemplate = 'API Support: {{contactName}} [{{contactEmail}}]({{contactEmail}})'
  + ' [{{contactUrl}}]({{contactUrl}}) | '

const apiSupport = (contact?: OpenAPIV3.ContactObject): string => {
  if(!contact || Object.entries(contact).length <= 0) { return '' }

  const replacer: ReplacerKeyValueType[] = [
    {
      key: 'contactName',
      value: contact.name ?? '',
    },
    {
      key: 'contactEmail',
      value: contact.email ?? '',
    },
    {
      key: 'contactUrl',
      value: contact.url ?? '',
    },
  ]

  return templateReplacer(apiSupportTemplate, replacer)
}

export { apiSupport }
