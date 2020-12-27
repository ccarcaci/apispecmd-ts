import { fetchReference } from 'src/spec/parsing/fetchReference'

// eslint-disable-next-line max-lines-per-function
describe('Fetch Referenced Object From $ref', () => {
  test('Fetch requestBody', () => {
    const fetchedObject = fetchReference('#/components/requestBodies/Pet', {
      requestBodies: {
        Pet: {
          content: {
            'application/json': {},
          },
        },
      },
    })

    expect(fetchedObject).toEqual({
      content: {
        'application/json': {},
      },
    })
  })

  test('Fetch requestBody with two indirection levels', () => {
    const fetchedObject = fetchReference('#/components/requestBodies/Pet', {
      requestBodies: {
        Pet: {
          $ref: '#/components/examples/PetIndirection',
        },
      },
      examples: {
        PetIndirection: {
          summary: 'The pet',
        },
      },
    })

    expect(fetchedObject).toEqual({
      summary: 'The pet',
    })
  })
})
