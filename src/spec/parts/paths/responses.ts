import { OpenAPIV3 } from 'openapi-types'
import { replacer } from 'src/util/replacer'
import { mediaType } from './mediaType/mediaType'

const responsesTemplate = `## Responses

{{responseContents}}`

const responses = (responses: OpenAPIV3.ResponsesObject): string => {
  const responsesCodes = Object.keys(responses)
  const responseContents = responsesCodes.map((responseCode) =>
    // eslint-disable-next-line security/detect-object-injection
    response(responseCode, responses[responseCode] as OpenAPIV3.ResponseObject))
    .join('\n\n')
  const templateReplacements = { responseContents }
  return replacer(responsesTemplate, templateReplacements)
}

// # ## ### ###### ########

const responseTemplate = `### {{responseCode}} ({{description}})

{{contentPart}}`

const response = (responseCode: string, response: OpenAPIV3.ResponseObject): string => {
  const contentPart = responseContent(response.content)
  const templateReplacements = {
    contentPart,
    description: response.description,
    responseCode,
  }
  return replacer(responseTemplate, templateReplacements)
}

const responseContent = (content?: { [media: string]: OpenAPIV3.MediaTypeObject}): string => {
  if(!content) { return '' }

  const mediaTypeKeys = Object.keys(content)
  // eslint-disable-next-line security/detect-object-injection
  return mediaTypeKeys.map((mediaTypeKey) => mediaType(mediaTypeKey, content[mediaTypeKey]))
    .join('\n\n')
}

// # ## ### ###### ########

export { responses }
