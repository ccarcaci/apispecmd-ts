import { templateReplacer } from '../../../util/markdownReplacer'
import { OperationType } from './types/OperationType'

const titleTemplate = `# [{{verb}}] {{path}} ({{operationId}})

{{summary}}

{{description}}`

const title = (spec: OperationType): string => {
  const replacements = {
    verb: spec.verb,
    path: spec.path,
    summary: spec.summary ?? '',
    description: spec.description ?? '',
    operationId: spec.operationObject.operationId ?? '',
  }

  return templateReplacer(titleTemplate, replacements)
}

export { title }
