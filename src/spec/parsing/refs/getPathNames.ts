import { OpenAPIV3 } from 'openapi-types'

const getPathNames = (paths: OpenAPIV3.PathsObject): string[] => Object.keys(paths)

export { getPathNames }
