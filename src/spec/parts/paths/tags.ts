import { templateReplacer } from '../../../util/markdownReplacer'

const tagsTemplate = `### Tags

{{tags}}`

const tagTemplate = '- {{tag}}'

const tags = (tags?: string[]): string => {
  if(!tags) { return '' }

  const tagsTemplates = tags.map((tag) => {
    const replacement = { tag }
    return templateReplacer(tagTemplate, replacement)
  }).join('\n')

  const replacement = { tags: tagsTemplates }

  return templateReplacer(tagsTemplate, replacement)
}

export { tags }
