import { OpenAPIV3 } from 'openapi-types'
import { templateReplacer } from '../../../../util/markdownReplacer'

const apiKeySecuritySchemeTemplate = `### {{securityKey}} security (apiKey)

{{description}}

{{in}} param: {{name}}`

const renderApiKeySecurity = (securityKey: string, securityScheme: OpenAPIV3.ApiKeySecurityScheme): string => {
  const replacements = {
    securityKey,
    description: securityScheme.description ?? '',
    ...securityScheme,
  }

  return templateReplacer(apiKeySecuritySchemeTemplate, replacements)
}

export { renderApiKeySecurity }
