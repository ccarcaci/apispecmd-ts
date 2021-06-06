import { fetchReference } from "src/spec/parsing/refs/fetchReference"

describe('Fetch Referenced Object in Case of Circular Dependency', () => {
  test('Fetch requestBody nested circular', () => {
    debugger
    const fetchedObject = fetchReference('#/components/requestBodies/Pet', {
        requestBodies: {
          Pet: {
            $ref: '#/components/schemas/PetIndirection',
          },
        },
        schemas: { },
      },
      [ '#/components/schemas/PetIndirection' ],
      )

    expect(fetchedObject).toEqual({
        circular: '#/components/schemas/PetIndirection',
    })
  })
})
