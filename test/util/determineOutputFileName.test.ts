import { mocked } from 'ts-jest/utils'

import { idGenerator } from 'src/util/idGenerator'
import { determineOutputFileName } from 'src/util/determineOutputFileName'

jest.mock('src/util/idGenerator.ts')

const idGeneratorMock = mocked(idGenerator)

describe('Determine Markdown Output File Name', () => {
  test('Output file name is not defined', () => {
    idGeneratorMock.mockReturnValue('5eda2')
    const outputFileName = determineOutputFileName('/input/path/to/petStore.yaml')

    expect(outputFileName).toBe('/input/path/to/petStore-5eda2.md')
  })

  test('Output file name provided', () => {
    idGeneratorMock.mockReturnValue('5eda2')
    const outputFileName = determineOutputFileName('/input/path/to/petStore.yaml', '/output/path/to/petStoreSpec.md')

    expect(outputFileName).toBe('/output/path/to/petStoreSpec.md')
  })
})
