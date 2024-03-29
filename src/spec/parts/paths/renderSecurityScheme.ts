import { KeySecuritySchemeType } from './types/KeySecuritySchemeType'
import { renderHttpSecurity } from './securitySchemeRenderers/renderHttpSecurity'
import { renderApiKeySecurity } from './securitySchemeRenderers/renderApiKeySecurity'
import { renderOauth2Security } from './securitySchemeRenderers/renderOauth2Security'
import { renderOpenIdConnectSecurity } from './securitySchemeRenderers/renderOpenIdConnectSecurity'

const renderSecurityScheme = (keySecuritySchemes: KeySecuritySchemeType): string => {
  const keys = Object.keys(keySecuritySchemes)

  if (keys.length <= 0) {
    return ''
  }

  return keys.reduce((_, key) => {
    // eslint-disable-next-line security/detect-object-injection
    const securityScheme = keySecuritySchemes[key]

    if (securityScheme.type === 'http') {
      return renderHttpSecurity(key, securityScheme)
    }
    if (securityScheme.type === 'apiKey') {
      return renderApiKeySecurity(key, securityScheme)
    }
    if (securityScheme.type === 'oauth2') {
      return renderOauth2Security(key, securityScheme)
    }
    if (securityScheme.type === 'openIdConnect') {
      return renderOpenIdConnectSecurity(key, securityScheme)
    }

    return ''
  }, '')
}

export { renderSecurityScheme }
