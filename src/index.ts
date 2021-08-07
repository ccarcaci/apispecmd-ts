import { logger } from './util/logger'
import { determineOutputFileName } from './util/determineOutputFileName'
import { convertApiSpecToMd } from './convertApiSpecToMd'

// eslint-disable-next-line no-process-env
const inputSpec = process.env.INPUT_SPEC

if (inputSpec === undefined) {
  logger.error('Please provide an input file using INPUT_SPEC env var')
  process.exit(-1)
}

// eslint-disable-next-line no-process-env
const outputMarkdown = determineOutputFileName(inputSpec, process.env.OUTPUT_MARKDOWN)
// eslint-disable-next-line no-process-env
const outputPdf = process.env.OUTPUT_PDF

;(async () => await convertApiSpecToMd(inputSpec, outputMarkdown, outputPdf))()

export { convertApiSpecToMd }
