import { OpenAPIV3 } from 'openapi-types'
import { mocked } from 'ts-jest/utils'

import { mediaType } from 'src/spec/parts/paths/mediaType/mediaType'
import { responses } from 'src/spec/parts/paths/responses'

jest.mock('src/spec/parts/paths/mediaType/mediaType')

const mediaTypeMock = mocked(mediaType)

// eslint-disable-next-line max-lines-per-function
describe('Generate Response Part', () => {
  test('Response 200 has description', () => {
    const responsesObject: OpenAPIV3.ResponsesObject = {
      200: {
        description: 'Everything went good',
      },
    }

    expect(responses(responsesObject)).toBe(`## Responses

### 200 (Everything went good)`)
  })

  test('Multiple responses', () => {
    const responsesObject: OpenAPIV3.ResponsesObject = {
      200: {
        description: 'Everything went good',
      },
      400: {
        description: 'Something wrong',
      },
    }

    expect(responses(responsesObject)).toBe(`## Responses

### 200 (Everything went good)

### 400 (Something wrong)`)
  })

  test('Render media type part', () => {
    mediaTypeMock.mockReturnValue('Media type content')
    const responseObject: OpenAPIV3.ResponsesObject = {
      200: {
        description: 'Everything went good',
        content: {
          'application/json': {
            schema: { type: 'string' },
          },
        },
      },
    }

    expect(responses(responseObject)).toBe(`## Responses

### 200 (Everything went good)

Media type content`)
    expect(mediaTypeMock).toBeCalledWith('application/json', {
      schema: { type: 'string' },
    })
  })
})
