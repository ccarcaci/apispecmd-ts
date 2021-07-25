import fs from 'fs'
import SwaggerParser from '@apidevtools/swagger-parser'
import { OpenAPI, OpenAPIV3 } from 'openapi-types'

import { heading } from './spec/parts/heading'
import { paths } from './spec/parts/paths'
import { logger } from './util/logger'
import { determineOutputFileName } from './util/determineOutputFileName'

// eslint-disable-next-line no-process-env
const inputSpec = process.env.INPUT_SPEC

if(inputSpec === undefined) {
  logger.error('Please provide an input file using INPUT_SPEC env var')
  process.exit(-1)
}

// eslint-disable-next-line no-process-env
const outputMarkdown = determineOutputFileName(inputSpec, process.env.OUTPUT_MARKDOWN)

SwaggerParser.validate(inputSpec, (err: Error | null, api?: OpenAPI.Document) => {
  if (err) {
    logger.error(`ERROR | ${JSON.stringify(err, null, 2)}`)
    return
  }

  if(!api) {
    logger.error('ERROR | Spec is null')
    return
  }

  logger.info(`Markdown will be saved to ${outputMarkdown}`)

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const writeStream = fs.createWriteStream(outputMarkdown, { flags: 'w' })
  const specV3 = api as OpenAPIV3.Document
  heading(writeStream, specV3)
  paths(writeStream, specV3)
})
