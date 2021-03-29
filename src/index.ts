import fs from 'fs'
import SwaggerParser from '@apidevtools/swagger-parser'
import { OpenAPI, OpenAPIV3 } from 'openapi-types'
import { heading } from './spec/parts/heading'
import { resolveRefs } from './spec/parsing/refs/resolveRefs'
import { paths } from './spec/parts/paths'
import { logger } from './util/logger'

const args = process.argv.slice(2)
const yamlPath = args[0]
const outputMarkDownPath = args[1] || 'openapi/markdowns/output/spec.md'

SwaggerParser.validate(yamlPath, (err: Error | null, api?: OpenAPI.Document) => {
  if (err) {
    logger.error(`ERROR | ${JSON.stringify(err, null, 2)}`)
    return
  }

  if(!api) {
    logger.error('ERROR | Spec is null')
    return
  }

  logger.info(`Markdown will be saved to ${outputMarkDownPath}`)

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const writeStream = fs.createWriteStream(outputMarkDownPath, { flags: 'w' })

  const specV3 = api as OpenAPIV3.Document
  resolveRefs(specV3)
  heading(writeStream, specV3)
  paths(writeStream, specV3)
})
