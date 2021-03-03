import { templateReplacer } from '../../../util/markdownReplacer'

const termsOfServiceTemplate = '[Terms of Service]({{termsOfServiceUrl}})'

const termsOfService = (termsOfService?: string): string => {
  if(!termsOfService) { return '' }

  const replacer = { termsOfServiceUrl: termsOfService }

  return templateReplacer(termsOfServiceTemplate, replacer)
}

export { termsOfService }
