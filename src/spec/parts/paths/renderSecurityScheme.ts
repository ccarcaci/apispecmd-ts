import { KeySecuritySchemeType } from './types/KeySecuritySchemeType'
import { renderHttpSecurity } from './securitySchemeRenderers/renderHttpSecurity'

const renderSecurityScheme = (keySecuritySchemes: KeySecuritySchemeType): string => {
  const keys = Object.keys(keySecuritySchemes)

  if(keys.length <= 0) { return '' }

  return keys.reduce((_, key) => {
    // eslint-disable-next-line security/detect-object-injection
    const securityScheme = keySecuritySchemes[key]

    if(securityScheme.type === 'http') { return renderHttpSecurity(key, securityScheme) }

    return ''
  }, '')
}

export { renderSecurityScheme }
