import fs from 'fs'
import SwaggerParser from '@apidevtools/swagger-parser'
import { OpenAPI } from 'openapi-types'
import { heading } from './spec/parts/heading'

const args = process.argv.slice(2)
const yamlPath = args[0]
const outputMarkDownPath = args[1] || 'openapi/markdowns/output/spec.md'

SwaggerParser.validate(yamlPath, (err: Error | null, api?: OpenAPI.Document) => {
  if (err) {
    console.error(`ERROR | ${JSON.stringify(err, null, 2)}`)
    return
  }

  if(!api) {
    console.error('ERROR | Spec is null')
    return
  }

  console.log(`Markdown will be saved to ${outputMarkDownPath}`)

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const writeStream = fs.createWriteStream(outputMarkDownPath, { flags: 'w' })

  heading(writeStream, api)
})
