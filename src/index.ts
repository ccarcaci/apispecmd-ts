import SwaggerParser from '@apidevtools/swagger-parser'
import { OpenAPI } from 'openapi-types'

const args = process.argv.slice(2)
const yamlPath = args[0]
// const outputMarkDownPath = args[1] || 'openapi/markdowns/output/spec.md'


SwaggerParser.validate(yamlPath, (err: Error | null, api?: OpenAPI.Document) => {
  if (err) {
    console.error(`ERROR | ${JSON.stringify(err, null, 2)}`)
    return
  }

  console.log(api)
  // console.log(JSON.stringify(specObject, null, 2))
})
