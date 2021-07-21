import { OpenAPIV3 } from 'openapi-types'

import { templateReplacer } from '../../../util/markdownReplacer'

const tagsTemplate = `## Tags

{{tags}}`

const tagTemplate = '- {{name}}: {{description}}'

const tags = (tags?: OpenAPIV3.TagObject[]): string => {
  if(!tags) { return '' }

  const tagsTemplates = tags.map((tag) => {
    const replacement = { name: tag.name, description: tag.description }
    return templateReplacer(tagTemplate, replacement)
  }).join('\n')

  const replacement = { tags: tagsTemplates }

  return templateReplacer(tagsTemplate, replacement)
}

export { tags }
