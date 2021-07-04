import { OpenAPIV3 } from 'openapi-types'
import { templateReplacer } from '../../../../util/markdownReplacer'

type FlowSecurity = {
  authorizationUrl?: string,
  tokenUrl?: string,
  refreshUrl?: string,
  scopes: {
    [scope: string]: string,
  },
}

const oauthSecuritySchemeTemplate = `## {{securityKey}} security (oauth2)

{{flows}}`

const flowSchemeTemplate = `### {{flowName}} Flow

{{urls}}

Scopes:

{{scopes}}`

const flowUrlTemplate = '* {{urlType}}: [{{url}}]({{url}})'

const scopeTemplate = '* {{scopeName}}: {{scopeDescription}}'

const generateFlow = (flowName: string, flowSecurity: FlowSecurity): string => {
  const authorizationPart = flowSecurity.authorizationUrl ? templateReplacer(flowUrlTemplate, {
    urlType: 'authorization',
    url: flowSecurity.authorizationUrl,
  }) : ''
  const tokenPart = flowSecurity.tokenUrl ? templateReplacer(flowUrlTemplate, {
    urlType: 'token',
    url: flowSecurity.tokenUrl,
  }) : ''
  const refreshPart = flowSecurity.refreshUrl ? templateReplacer(flowUrlTemplate, {
    urlType: 'refresh',
    url: flowSecurity.refreshUrl,
  }) : ''
  const urls = [ authorizationPart, tokenPart, refreshPart ].filter((part) => part).join('\n')
  const scopes = Object.keys(flowSecurity.scopes)
    .map((scopeName) => {
      const replacements = {
        scopeName,
        // eslint-disable-next-line security/detect-object-injection
        scopeDescription: flowSecurity.scopes[scopeName],
      }
      return templateReplacer(scopeTemplate, replacements)
    })
    .join('\n')
  const replacements = {
    flowName,
    urls,
    scopes,
  }

  return templateReplacer(flowSchemeTemplate, replacements)
}

const renderOauth2Security = (securityKey: string, securityScheme: OpenAPIV3.OAuth2SecurityScheme): string => {
  const implicitFlowPart = securityScheme.flows.implicit
    ? generateFlow('Implicit', securityScheme.flows.implicit)
    : ''
  const passwordFlowPart = securityScheme.flows.password
    ? generateFlow('Password', securityScheme.flows.password)
    : ''
  const clientCredentialsPart = securityScheme.flows.clientCredentials
    ? generateFlow('Client Credentials', securityScheme.flows.clientCredentials)
    : ''
  const authorizationPart = securityScheme.flows.authorizationCode
    ? generateFlow('Authorization Code', securityScheme.flows.authorizationCode)
    : ''
  const flows = [ implicitFlowPart, passwordFlowPart, clientCredentialsPart, authorizationPart ].join('\n\n')
  const replacements = {
    securityKey,
    flows,
  }

  return templateReplacer(oauthSecuritySchemeTemplate, replacements)
}

export { renderOauth2Security }
