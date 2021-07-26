import fs from 'fs'
import mdToPdf from 'md-to-pdf'

import { logger } from './logger'

const convertToPdf = async (path: string, dest: string): Promise<void> => {
  try {
    const pdf = await mdToPdf({ path }, { dest })

    if (pdf) {
      fs.writeFileSync(dest, pdf.content);
    }
  } catch(error) {
    logger.error(error)
  }
}

export { convertToPdf }
