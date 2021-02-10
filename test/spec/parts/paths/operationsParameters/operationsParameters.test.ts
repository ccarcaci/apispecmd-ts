import { OpenAPIV3 } from 'openapi-types'

import { parameters } from 'src/spec/parts/paths/operationsParameters/parameters'

// eslint-disable-next-line max-lines-per-function
describe('Generate Operation Parameters Table and Paragraph', () => {
  test('No params specified', () => expect(parameters([])).toBe(''))

  test('Complete parameter definition', () => {
    const params: OpenAPIV3.ParameterObject[] = [{
      description: 'The fundamental param',
      name: 'fancyParam',
      in: 'query',
      required: true,
      deprecated: true,
      explode: true,
      allowReserved: true,
      schema: {
        type: 'number',
      },
    }]
    const paramsMd = parameters(params)

    expect(paramsMd).toBe(`## Parameters

|Name|Type|In|Required|Deprecated|Explode|Allow Reserved|
|-|-|-|-|-|-|-|
|fancyParam|number|query|yes|yes|yes|yes|

**Parameters Descriptions**

* fancyParam: The fundamental param
`)
  })

  test('Minimal parameter definition', () => {
    const params: OpenAPIV3.ParameterObject[] = [{
      name: 'fancyParam',
      in: 'query',
    }]
    const paramsMd = parameters(params)

    expect(paramsMd).toBe(`## Parameters

|Name|Type|In|Required|Deprecated|Explode|Allow Reserved|
|-|-|-|-|-|-|-|
|fancyParam||query|no|no|no|no|

**Parameters Descriptions**

* fancyParam: No description provided
`)
  })

  test('Two parameters provided', () => {
    const params: OpenAPIV3.ParameterObject[] = [
      {
        description: 'The fundamental param',
        name: 'param1',
        in: 'query',
        required: true,
        deprecated: true,
        explode: true,
        allowReserved: true,
        schema: {
          type: 'number',
        },
      },
      {
        name: 'param2',
        in: 'path',
      },
    ]
    const paramsMd = parameters(params)

    expect(paramsMd).toBe(`## Parameters

|Name|Type|In|Required|Deprecated|Explode|Allow Reserved|
|-|-|-|-|-|-|-|
|param1|number|query|yes|yes|yes|yes|
|param2||path|no|no|no|no|

**Parameters Descriptions**

* param1: The fundamental param
* param2: No description provided
`)
  })
})
