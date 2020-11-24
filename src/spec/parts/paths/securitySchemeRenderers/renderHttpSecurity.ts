import { OpenAPIV3 } from 'openapi-types'
import { templateReplacer } from 'src/util/markdownReplacer'

const httpSecuritySchemeTemplate = `### {{securityKey}} security (http)

{{description}}

{{scheme}} ({{bearerFormat}})`

const renderHttpSecurity = (securityKey: string, securityScheme: OpenAPIV3.HttpSecurityScheme): string => {
  const replacements = {
    securityKey,
    description: securityScheme.description ?? '',
    bearerFormat: securityScheme.bearerFormat ?? '',
    ...securityScheme,
  }

  return templateReplacer(httpSecuritySchemeTemplate, replacements)
}

export { renderHttpSecurity }
