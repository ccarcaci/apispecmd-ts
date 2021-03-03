import { OpenAPIV3 } from 'openapi-types'
import { templateReplacer } from '../../../util/markdownReplacer'

const licenseTemplate = 'License: {{licenseName}}'
const licenseUrlTemplate = 'License: [{{licenseName}}]({{licenseUrl}})'

const license = (license?: OpenAPIV3.LicenseObject): string => {
  if(!license) { return '' }

  const replacer = { licenseName: license.name }

  if(license.url) {
    const urlReplacer = { ...replacer, licenseUrl: license.url }

    return templateReplacer(licenseUrlTemplate, urlReplacer)
  }

  return templateReplacer(licenseTemplate, replacer)
}

export { license }
