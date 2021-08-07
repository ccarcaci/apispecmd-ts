import { OpenAPIV3 } from 'openapi-types'
import { templateReplacer } from '../../../util/markdownReplacer'
import { ReplacerKeyValueType } from '../../../util/replacer'

const apiSupportTemplate =
  'API Support: {{contactName}} [{{contactEmail}}]({{contactEmail}})' + ' [{{contactUrl}}]({{contactUrl}}) | '

const apiSupport = (contact?: OpenAPIV3.ContactObject): string => {
  if (!contact || Object.entries(contact).length <= 0) {
    return ''
  }

  const replacer: ReplacerKeyValueType = {
    contactName: contact.name ?? '',
    contactEmail: contact.email ?? '',
    contactUrl: contact.url ?? '',
  }

  return templateReplacer(apiSupportTemplate, replacer)
}

export { apiSupport }
