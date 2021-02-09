import { OpenAPIV3 } from 'openapi-types'

const removeDuplicatedParameters = (
  ...parametersSets: (OpenAPIV3.ParameterObject[] | undefined)[]): OpenAPIV3.ParameterObject[] => {
  const allParameters: OpenAPIV3.ParameterObject[] = parametersSets
    .filter((parameterSet) => parameterSet) // Remove undefined ones
    .flatMap((parametersSet) => parametersSet as OpenAPIV3.ParameterObject[])

  let deduplicatedParameters: OpenAPIV3.ParameterObject[] = []
  for(const parameter of allParameters) {
    if(noOccurrences(parameter, deduplicatedParameters)) {
      deduplicatedParameters = [ ...deduplicatedParameters, parameter ]
    }
  }

  return deduplicatedParameters
}

const noOccurrences = (parameter: OpenAPIV3.ParameterObject, parameters: OpenAPIV3.ParameterObject[]): boolean => {
  const parametersFound = parameters.filter((searchParameter) =>
    searchParameter.name === parameter.name && searchParameter.in === parameter.in)
  return parametersFound.length <= 0
}

export { removeDuplicatedParameters }
