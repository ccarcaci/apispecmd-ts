import { templateReplacer } from 'src/util/markdownReplacer'

const termsOfServiceTemplate = '[Terms of Service]({{termsOfServiceUrl}})'

const termsOfService = (termsOfService?: string): string => {
  if(!termsOfService) { return '' }

  const replacer = { key: 'termsOfServiceUrl', value: termsOfService }

  return templateReplacer(termsOfServiceTemplate, replacer)
}

export { termsOfService }
