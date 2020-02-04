# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- [README.md](.README.md) file to include updated env vars.
- Redis service added to CI pipeline
- Included server config in jest-puppeteer config
- Use mock Redis library as we don't have Redis server on AWS

### Added

- [husky](https://www.npmjs.com/package/husky) npm package to handle git commit hooks
- [@commitlint](https://github.com/marionebl/commitlint) npm package to lint git
  commit messages
- Markdown linting with [markdownlint-cli](https://github.com/igorshubovych/markdownlint-cli)
- CHANGELOG.md file to manage changes
- CONTRIBUTING.md file to outline coding/contributing standards and guidelines
- Allowing for enviroment variables when running E2E tests for both local
  development and CI pipelines

### Removed

- Removed `pre-commit` package
- Removed ci:start and ci:end npm commands in replacement of puppeteer server

[Unreleased]: https://bitbucket.org/byndops/finsa-tradenation-frontend/commits/HEAD
