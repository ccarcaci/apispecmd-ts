import { renderSecurityScheme } from 'src/spec/parts/paths/renderSecurityScheme'
import { KeySecuritySchemeType } from 'src/spec/parts/paths/types/KeySecuritySchemeType'

// eslint-disable-next-line max-lines-per-function
describe('Render Different Types of Security Schemes', () => {
  // eslint-disable-next-line max-lines-per-function
  test('oauth2SecurityScheme', () => {
    const oauth2SecurityScheme: KeySecuritySchemeType = {
      petstore_auth: {
        type: 'oauth2',
        flows: {
          implicit: {
            authorizationUrl: 'http://oauth2.implicit.url/auth',
            refreshUrl: 'http://oauth2.implicit.url/refresh',
            scopes: {
              'write:pets': 'update pets',
              'read:pets': 'get pets',
            },
          },
          password: {
            tokenUrl: 'http://oauth2.password.url/token',
            refreshUrl: 'http://oauth2.password.url/refresh',
            scopes: {
              'write:pets': 'update pets',
              'read:pets': 'get pets',
            },
          },
          clientCredentials: {
            tokenUrl: 'http://oauth2.clientCredentials.url/token',
            refreshUrl: 'http://oauth2.clientCredentials.url/refresh',
            scopes: {
              'write:pets': 'update pets',
              'read:pets': 'get pets',
            },
          },
          authorizationCode: {
            authorizationUrl: 'http://oauth2.authorizationCode.url/auth',
            tokenUrl: 'http://oauth2.authorizationCode.url/token',
            refreshUrl: 'http://oauth2.authorizationCode.url/refresh',
            scopes: {
              'write:pets': 'update pets',
              'read:pets': 'get pets',
            },
          },
        },
      },
    }

    expect(renderSecurityScheme(oauth2SecurityScheme)).toBe(`### petstore_auth security (oauth2)

#### Implicit Flow

* authorization: [http://oauth2.implicit.url/auth](http://oauth2.implicit.url/auth)
* refresh: [http://oauth2.implicit.url/refresh](http://oauth2.implicit.url/refresh)

Scopes:

* write:pets: update pets
* read:pets: get pets

#### Password Flow

* token: [http://oauth2.password.url/token](http://oauth2.password.url/token)
* refresh: [http://oauth2.password.url/refresh](http://oauth2.password.url/refresh)

Scopes:

* write:pets: update pets
* read:pets: get pets

#### Client Credentials Flow

* token: [http://oauth2.clientCredentials.url/token](http://oauth2.clientCredentials.url/token)
* refresh: [http://oauth2.clientCredentials.url/refresh](http://oauth2.clientCredentials.url/refresh)

Scopes:

* write:pets: update pets
* read:pets: get pets

#### Authorization Code Flow

* authorization: [http://oauth2.authorizationCode.url/auth](http://oauth2.authorizationCode.url/auth)
* token: [http://oauth2.authorizationCode.url/token](http://oauth2.authorizationCode.url/token)
* refresh: [http://oauth2.authorizationCode.url/refresh](http://oauth2.authorizationCode.url/refresh)

Scopes:

* write:pets: update pets
* read:pets: get pets`)
  })

  test('oauth2SecurityScheme minimal information', () => {
    const oauth2SecurityScheme: KeySecuritySchemeType = {
      petstore_auth: {
        type: 'oauth2',
        flows: {
          implicit: {
            authorizationUrl: 'http://oauth2.implicit.url/auth',
            scopes: {
              'write:pets': 'update pets',
              'read:pets': 'get pets',
            },
          },
        },
      },
    }

    expect(renderSecurityScheme(oauth2SecurityScheme)).toBe(`### petstore_auth security (oauth2)

#### Implicit Flow

* authorization: [http://oauth2.implicit.url/auth](http://oauth2.implicit.url/auth)

Scopes:

* write:pets: update pets
* read:pets: get pets`)
  })
})
