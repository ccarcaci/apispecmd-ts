import { OpenAPIV3 } from 'openapi-types'

import { templateReplacer } from '../../../../util/markdownReplacer'

const openIdSecuritySchemeTemplate = `## {{securityKey}} security (openIdConnect)

{{description}}

OpenId Connect Url: [{{openIdConnectUrl}}]({{openIdConnectUrl}})`

const renderOpenIdConnectSecurity = (securityKey: string, securityScheme: OpenAPIV3.OpenIdSecurityScheme): string => {
  const replacements = {
    securityKey,
    description: securityScheme.description ?? '',
    ...securityScheme,
  }

  return templateReplacer(openIdSecuritySchemeTemplate, replacements)
}

export { renderOpenIdConnectSecurity }
