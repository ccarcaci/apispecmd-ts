# apispecmd-ts

[![<CircleCI>](https://circleci.com/gh/ccarcaci/apispecmd-ts.svg?style=shield)](https://circleci.com/gh/ccarcaci/apispecmd-ts)
[![npm](https://img.shields.io/npm/v/@bitacode/apispecmd-ts?color=green)](https://www.npmjs.com/package/@bitacode/apispecmd-ts)
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

- [Jest](https://jestjs.io/)
- [openapi-types](https://github.com/kogosoftwarellc/open-api/tree/master/packages/openapi-types)
- [Swagger Parser](https://apitools.dev/swagger-parser/)
- [Typescript](https://www.typescriptlang.org/)
- [Winston](https://github.com/winstonjs/winston)

## Usage

### Current Version

The project is currently in official development release, thus the first working version is `v0.1.0`. No major version has been released yet.
Versions prior to `v0.1.0` (`v0.0.x`) are intended for embrional state of this project, their usage is discouraged.

### Install

`$ npm install @bitacode/apispecmd-ts`

### Launch With Command Line

`$ INPUT_SPEC=/path/to/spec.yaml OUTPUT_MARKDOWN=/path/to/output.md OUTPUT_PDF=/path/to/output.pdf apispecmd-ts`

### Use as Library

```typescript
import { convertApiSpecToMd } from '@bitacode/apispecmd-ts'

const markdownContent: string | void = await convertApiSpecToMd('/path/to/spec.yaml')

console.log(markdownContent)
```

Function signature is:

```typescript
const convertApiSpecToMd = async (inputSpec: string, outputMarkdown?: string, outputPdf?: string): Promise<string | void>
```

If no outputMarkdown is specified the output will be a string, as reported in the above example.

If no outputPdf is provided only the markdown output will be generated.

It is not possible to generate only the PDF without markdown.

## Docker Image

You can find a fully working Docker image on [Dockerhub](https://hub.docker.com/repository/docker/ccarcaci/apispecmd-ts).
You can build the image by yourself using the [Dockerfile](Dockerfile) in this repo.

### Convert Using Docker

```bash
$ docker run --rm --name apispecmd-ts \
  --volume /path/to/openapi/spec/folder/:/app/input
  --volume /path/to/markdown/output/folder/:/app/output
  --env INPUT_SPEC=input/apispec.yaml \
  --env OUTPUT_MARKDOWN=output/output-markdown.md \
  --env OUTPUT_PDF=output/output-pdf.pdf \ # OPTIONAL
  ccarcaci/apispecmd-ts
```

Where:

- `/path/to/openapi/spec/folder/` points to spec host folder where your apispec.yaml file resides.
- `/path/to/markdown/output/folder` points to the folder where you want to store your markdown result.
- `INPUT_SPEC=input/apispec.yaml` "input" part is fixed and apispec.yaml is your spec file name.
- `OUTPUT_MARKDOWN=output/output-markdown.md` "output" part is fixed and output-markdown.md is the desired name of your markdown output.
- (OPTIONAL) - `OUTPUT_PDF=output/output-pdf.pdf` "output" part is fixed and output-pdf.pdf is the desired name of your pdf output.

## Semver

This project follows the [Semver specification](https://semver.org/) for versioning starting from `v1.0.0`

- Major releases of [OpenAPI](https://www.openapis.org/) specification results in major release of the library.
- Notable changes in the output format of Markdown output result in a minor release of the library.

## Contributing

This project will not be eagerly maintained, the creator is involved with several other projects, so contibutions are strongy welcome.

To contribute with this repo:

- Fork the project.
- Create your feature branch with the following naming convention.
  `feature/the-new-fancy-feat`
- Commit your changes.
- Create a PR.

### Contibution Rules

In order to contribute with this project there are some rules to follow.

- Provided code must be covered with unit tests.
- Correct conversion proof must be provided alongside the PR.
- These [Eslint rules](...) must be fullfilled (download them and integrate with your editor).

### Contributors

- [Claudio Carcaci](https://www.linkedin.com/in/ccarcaci/) - Creator

## License

Distributed under the [MIT](LICENSE.md) License.
