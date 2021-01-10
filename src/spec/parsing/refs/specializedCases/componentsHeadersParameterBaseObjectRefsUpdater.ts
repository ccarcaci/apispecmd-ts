import { OpenAPIV3 } from 'openapi-types'

import { fetchReference } from '../fetchReference'
import { getStringKeys } from '../getStringKeys'
import { isReference } from '../isReference'

const componentsHeadersParameterBaseObjectRefsUpdater = (spec: OpenAPIV3.Document): void => {
  const headersNames = getStringKeys(spec.components?.headers)

  headersNames.forEach((header) => {
    // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
    const headerObject = spec.components?.headers![header] as OpenAPIV3.HeaderObject

    if(isReference(headerObject) || !isReference(headerObject.schema)) { return }

    headerObject.schema = fetchReference(
      (headerObject.schema as OpenAPIV3.ReferenceObject).$ref,
      spec.components) as OpenAPIV3.SchemaObject
  })
}

export { componentsHeadersParameterBaseObjectRefsUpdater }
