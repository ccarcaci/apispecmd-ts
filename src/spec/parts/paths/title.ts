import { templateReplacer } from 'src/util/markdownReplacer'
import { OperationType } from './types/OperationType'

const titleTemplate = `## [{{verb}}] {{path}}

{{summary}}

{{description}}`

const title = (spec: OperationType): string => {
  const replacements = {
    verb: spec.verb,
    path: spec.path,
    summary: spec.summary ?? '',
    description: spec.description ?? '',
  }

  return templateReplacer(titleTemplate, replacements)
}

export { title }
