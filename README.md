<p align="center">
  <a href="http://syncbase.tv">
    <img alt="Brand logo" src="logo.svg">
  </a>
</p>

I welcome any kind of contribution!

### How to contribute (will add a proper and more detailed guide later)

#### Project setup

- I highly recommend to use vscode, but it's also fine to use a different code editor!
- Have node installed, preferably a version that is minimum 16 (I'm using v16.13.0 LTS)
- Have yarn installed
- Have postgresql installed, also the user postgres needs to have the password postgres
- You need to make a database by the name of: `syncbase`
- Have redis installed
- Clone this repo
- Run `yarn` inside of the root folder of the repo to install all necessary packages
- Make sure that the postgres instance and the redis instance are up and running before starting the node.js backend
- How to run the node.js backend server: `yarn workspace @syncbase/server dev`
- How to run the next.js frontend server: `yarn workspace @syncbase/web dev`

#### Contribution flow

- Fork this repo and submit a pull request pointing to the main branch of the original repo

| Storybook                                                                                         |
| ------------------------------------------------------------------------------------------------- |
| [Storybook library](https://main--619aa417876c17003a24f46a.chromatic.com)                         |
| [Chromatic library](https://www.chromatic.com/library?appId=619aa417876c17003a24f46a&branch=main) |

---

### TODO

- Add unit tests, integration tests and userflow/e2e tests
  - Also implement eslint plugins when necessary!
- Implement internationalization
- Implement dataloader
- Deploy web on vercel and server and it's services on DO droplet, automatic deployment should be done with github actions
- Maybe add standard-version/semantic-release/changeset?
- Actually develop the project
- Add more .md files to properly document the contribution process and attract contributors

### Notes

- Implement SEO optimizations later
- Implement OG meta tags later
- In the future we want to [organize by feature](https://softwareengineering.stackexchange.com/questions/338597/folder-by-type-or-folder-by-feature) rather than by type
- Docker & docker-compose?
- Sentry?
- Datadog?

<p align="center">
  <a href="http://commitizen.github.io/cz-cli/">
    <img alt="Commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg">
  </a>
  <a href="https://github.com/AndysonDK/syncbase/pulls">
    <img alt="Pull requests are welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg">
  </a>
  <a href="https://github.com/AndysonDK/syncbase/actions/workflows/lint.yml">
    <img alt="Lint workflow" src="https://img.shields.io/github/workflow/status/AndysonDK/syncbase/Lint?label=Lint">
  </a>
  <a href="https://github.com/AndysonDK/syncbase/actions/workflows/codeql.yml">
    <img alt="CodeQL workflow" src="https://img.shields.io/github/workflow/status/AndysonDK/syncbase/CodeQL?label=CodeQL">
  </a>
  <a href="https://github.com/AndysonDK/syncbase/actions/workflows/tests.yml">
    <img alt="Tests workflow" src="https://img.shields.io/github/workflow/status/AndysonDK/syncbase/Tests?label=Tests">
  </a>
  <a href="https://github.com/AndysonDK/syncbase/actions/workflows/ui_tests.yml">
    <img alt="UI Tests workflow" src="https://img.shields.io/github/workflow/status/AndysonDK/syncbase/UI%20Tests?label=UI%20Tests">
  </a>
<p>
