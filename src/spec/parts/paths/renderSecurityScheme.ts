import { KeySecuritySchemeType } from './types/KeySecuritySchemeType'
import { renderHttpSecurity } from './securitySchemeRenderers/renderHttpSecurity'
import { renderApiKeySecurity } from './securitySchemeRenderers/renderApiKeySecurity'

const renderSecurityScheme = (keySecuritySchemes: KeySecuritySchemeType): string => {
  const keys = Object.keys(keySecuritySchemes)

  if(keys.length <= 0) { return '' }

  return keys.reduce((_, key) => {
    // eslint-disable-next-line security/detect-object-injection
    const securityScheme = keySecuritySchemes[key]

    if(securityScheme.type === 'http') { return renderHttpSecurity(key, securityScheme) }
    if(securityScheme.type === 'apiKey') { return renderApiKeySecurity(key, securityScheme) }

    return ''
  }, '')
}

export { renderSecurityScheme }
