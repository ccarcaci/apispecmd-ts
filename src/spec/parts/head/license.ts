import { OpenAPIV3 } from 'openapi-types'
import { templateReplacer } from 'src/util/markdownReplacer'

const licenseTemplate = 'License: {{licenseName}}'
const licenseUrlTemplate = 'License: [{{licenseName}}]({{licenseUrl}})'

const license = (license?: OpenAPIV3.LicenseObject): string => {
  if(!license) { return '' }

  const replacer = { key: 'licenseName', value: license.name }

  if(license.url) {
    const urlReplacer = [ replacer, { key: 'licenseUrl', value: license.url } ]

    return templateReplacer(licenseUrlTemplate, urlReplacer)
  }

  return templateReplacer(licenseTemplate, replacer)
}

export { license }
