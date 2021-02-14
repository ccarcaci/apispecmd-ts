import { OpenAPIV3 } from 'openapi-types'
import { mocked } from 'ts-jest/utils'

import { mediaType } from 'src/spec/parts/paths/mediaType/mediaType'
import { operationRequestBody } from 'src/spec/parts/paths/operationRequestBody'

jest.mock('src/spec/parts/paths/mediaType/mediaType')

const mediaTypeMock = mocked(mediaType)

describe('Generate Request Body Part', () => {
  test('Generate description, required and content parts', () => {
    const requestBody: OpenAPIV3.RequestBodyObject = {
      description: 'This request body is the best one',
      content: {
        'application/json': {},
      },
      required: true,
    }
    mediaTypeMock.mockReturnValue('This is the media type part')

    expect(operationRequestBody(requestBody)).toBe(`### Request Body (required)
This request body is the best one

This is the media type part`)
  })

  test('No description and required flag provided', () => {
    const requestBody: OpenAPIV3.RequestBodyObject = {
      content: {
        'application/json': {},
      },
    }
    mediaTypeMock.mockReturnValue('This is the media type part')

    expect(operationRequestBody(requestBody)).toBe(`### Request Body (not required)

This is the media type part`)
  })
})
