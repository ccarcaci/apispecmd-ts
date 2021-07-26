import fs from 'fs'
import SwaggerParser from '@apidevtools/swagger-parser'
import { OpenAPIV3 } from 'openapi-types'

import { heading } from './spec/parts/heading'
import { paths } from './spec/parts/paths'
import { logger } from './util/logger'
import { convertToPdf } from './util/convertToPdf'
import { Stream, Writable } from 'stream'
import { StringDecoder } from 'string_decoder'

const convertApiSpecToMd = async (inputSpec: string, outputMarkdown?: string, outputPdf?: string): Promise<string | void> => {
  try {
    const api = await SwaggerParser.validate(inputSpec)
  
    if(api === undefined) {
      logger.error('ERROR | Spec is null')
      return Promise.reject()
    }
  
    const writeStream = getWriteStream(outputMarkdown)
    const specV3 = api as OpenAPIV3.Document
    heading(writeStream, specV3)
    paths(writeStream, specV3)

    if(outputMarkdown !== undefined) {
      logger.info(`Markdown saved to ${outputMarkdown}`)

      if(outputPdf !== undefined) {
        await convertToPdf(outputMarkdown, outputPdf)
        logger.info(`PDF be saved to ${outputPdf}`)
      }
    } else {
      return outputString
    }
  } catch(error) {
    logger.error(`ERROR | ${JSON.stringify(error, null, 2)}`)
  }
}

// # ## ### ##### ########

let outputString: string

const getWriteStream = (outputMarkdown?: string): Writable => {
  if(outputMarkdown === undefined) {
    outputString = ''
    return StringStream
  }

  return fs.createWriteStream(outputMarkdown, { flags: 'w' })
}

const StringStream = new Stream.Writable({
  write(chunk, _, callback) {
    const decoder = new StringDecoder()
    const decodedChunk = decoder.write(chunk)
    outputString = `${outputString}${decodedChunk}`
    callback()
  }
})

// # ## ### ##### ########

export { convertApiSpecToMd }
