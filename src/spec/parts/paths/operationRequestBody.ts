import { OpenAPIV3 } from 'openapi-types'

import { templateReplacer } from 'src/util/markdownReplacer'
import { mediaType } from './mediaType/mediaType'

const requestBodyTitleTemplate = `### Request Body ({{required}})
{{description}}

{{mediaTypePart}}
`

const operationRequestBody = (requestBody: OpenAPIV3.RequestBodyObject): string => {
  const mediaTypePart = generateAllMediaTypes(requestBody.content)
  const required = requestBody.required ? 'required' : 'not required'
  const description = requestBody.description ?? ''
  const replacements = {
    required,
    description,
    mediaTypePart,
  }

  return templateReplacer(requestBodyTitleTemplate, replacements)
}

const generateAllMediaTypes = (mediaTypeContent: { [media: string]: OpenAPIV3.MediaTypeObject }): string => {
  const medias = Object.keys(mediaTypeContent)
  let mediaTypePart = ''

  for(const media of medias) {
    // eslint-disable-next-line security/detect-object-injection
    const mediaTypeObject = mediaTypeContent[media]
    mediaTypePart = `${mediaTypePart}${mediaType(media, mediaTypeObject)}`
  }

  return mediaTypePart
}

export { operationRequestBody }
