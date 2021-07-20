# apispecmd-ts

[![<CircleCI>](https://circleci.com/gh/ccarcaci/apispecmd-ts.svg?style=shield)](<https://circleci.com/gh/ccarcaci/tokenator>)
[![npm](https://img.shields.io/npm/v/@bitacode/apispecmd-ts?color=green)](https://www.npmjs.com/package/@bitacode/tokenator)
[![License](https://img.shields.io/npm/l/@bitacode/apispecmd-ts)](https://mit-license.org/)

## Table of Contents

- [About the Project](#about-the-project)
  - [Built on Node.js With](#built-on-nodejs-with)
- [Usage](#usage)
  - [Install](#install)
  - [Launch](#launch)
  - [Use as Library](#use-as-library)
- [Docker Image](#docker-image)
  - [Convert to PDF Using Docker](#convert-to-pdf-using-docker)
- [Semver](#semver)
- [Contributing](#contributing)
  - [Contribution Rules](#contribution-rules)
  - [Contributors](#contributors)
- [License](#license)

## About the Project

apispecmd-ts, as the namme suggests, is a library that converts [OpenAPI 3.0](https://www.openapis.org/) yaml format specs into human-readable Markdown. This is an opinionated library: the output format, architectural choices and conventions are enforced by the development team to reduce decision burden and code complexity. ([Prettier](https://prettier.io/) is a good example of opinionated library)

The project is still in initial development phase.

### Built on [Node.js](https://nodejs.org/) With

* [Jest](https://jestjs.io/)
* [openapi-types](https://github.com/kogosoftwarellc/open-api/tree/master/packages/openapi-types)
* [Swagger Parser](https://apitools.dev/swagger-parser/)
* [Typescript](https://www.typescriptlang.org/)
* [Winston](https://github.com/winstonjs/winston)

## Usage

### Install
`$ npm install @bitacode/apispecmd-ts`

### Launch
`$ SPEC_PATH=/path/to/spec.yaml OUTPUT_PATH=/path/to/output.md npx apispecmd-ts`

### Use as Library

```typescript
import { convertApiSpecToMd } from '@bitacode/apispecmd-ts'

const markdownContent = convertApiSpecToMd('/path/to/spec.yaml')

console.log(markdownContent)
```

## Docker Image

TBD

### Convert to PDF Using Docker

## Semver

This project follows the [Semver specification](https://semver.org/) for versioning.

* Major releases of [OpenAPI](https://www.openapis.org/) specification results in major release of the library.
* Notable changes in the output format of Markdown output result in a minor release of the library.

## Contributing

This project will not eagerly maintained, the creator is involved with several other projects, so contibutions are strongy welcome.

To contribute with this repo:
* Fork the project.
* Create your feature branch with the following naming convention.
`feature/the-new-fancy-feat`
* Commit your changes.
* Create a PR.

### Contibution Rules

In order to contribute with this project there are some rules to follow.

* Provided code must be covered with unit tests.
* Correct conversion proof must be provided alongside the PR.
* These [Eslint rules](...) must be fullfilled (download them and integrate with your editor).

### Contributors

* [Claudio Carcaci](https://www.linkedin.com/in/ccarcaci/) - Creator

## License

Distributed under the [MIT](LICENSE.md) License.
