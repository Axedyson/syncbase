<p align="center">
  <a href="http://syncbase.tv">
    <img alt="Brand logo" src="logo.svg">
  </a>
</p>

## How to contribute (will add a proper and more detailed guide later)

### I welcome any kind of contribution!

- Vscode is highly recommended, but it's also fine to use a different code editor!
- Have node installed, preferably a version that is minimum 16 (I'm using v16.13.0 LTS)
- Have yarn installed
- Clone this repo
- Run `yarn` inside of the root folder of the repo to install all the necessary packages
- #### Installation of postgres and redis
  There are two ways to do this; either install them manually/natively or use the provided `docker-compose.yml` file to spin up a postgresql and redis container. To use `Docker Compose` run the following command in the root directory of the project: `docker compose up`
- For the postgresql database there needs to be a user with the name of `postgres` and with a password set to `postgres`
- There needs to be two databases: `syncbase` (used in development) and `syncbase_test` (used in tests)
- Running `yarn workspace @syncbase/server test` should create the `syncbase_test` database automatically
- After that you can run `yarn workspace @syncbase/server db:seed:reset` to create the necessary database relations and seed the development database `syncbase`
- Make sure that the postgres instance and the redis instance are up and running before starting the node.js backend
- Here is how to run the [node.js backend server](https://github.com/Axedyson/syncbase/tree/main/packages/server): `yarn workspace @syncbase/server dev`
- And here is how to run the [next.js frontend server](https://github.com/Axedyson/syncbase/tree/main/packages/web): `yarn workspace @syncbase/web dev`

### Contribution flow

- Fork this repo, remember to enable actions to run and then submit a pull request pointing to the `main` branch of this repo with your new changes. There is no specific commit naming convention to follow, just make sure that the pull request name is nice and descriptive! We will be using the [Github Flow](https://docs.github.com/en/get-started/quickstart/github-flow) branching workflow

| Storybook                                                                                         |
| ------------------------------------------------------------------------------------------------- |
| [Storybook library](https://main--619aa417876c17003a24f46a.chromatic.com)                         |
| [Chromatic library](https://www.chromatic.com/library?appId=619aa417876c17003a24f46a&branch=main) |

---

## TODO

- Deploy web on vercel and server and it's services on DO droplet, automatic deployment should be done with a github workflow
- Implement dataloader
- Maybe add standard-version/semantic-release/changeset/keepachangelog?
- Actually develop the project
- Add more .md files to properly document the contribution process and attract contributors
- https://github.com/microsoft/playwright/issues/7249#issuecomment-1154603556
- Should we be more granular when it comes to [exclusion](https://bobbyhadz.com/blog/typescript-exclude-test-files-from-compilation) of certain files from typescript build compilation
  output e.g. the `seeder` file in the `server` package?

## Notes

- Implement SEO optimizations later
- Implement OG meta tags later
- Implement [docker linting](https://github.com/jbergstroem/hadolint-gh-action)?
- Implement [DNSSEC](https://www.namecheap.com/support/knowledgebase/article.aspx/9718/2232/nameservers-and-tlds-supportedunsupported-by-dnssec/) on namecheap?
- Implement a page that showcases all of the open source libraries used in the project just like how [discord does it](https://discord.com/acknowledgements)
- In the future we want to [organize by feature](https://softwareengineering.stackexchange.com/questions/338597/folder-by-type-or-folder-by-feature) rather than by type
- More extensive Docker and Docker Compose configuration to provide easier setup and development e.g. [vscode development containers](https://code.visualstudio.com/docs/remote/containers)
- [terraform security](https://www.checkov.io/4.Integrations/GitHub%20Actions.html)
- Sentry?
- Datadog?

## Contact

If you have any questions at all, trouble setting things up etc. you can contact me the main maintainer of this project at:

- andersalting@gmail.com
- `Axedyson#6431` (We will first need to be friends on discord before we can chat, will probably make a dedicated discord server in the future)

<p align="center">
  <a href="https://github.com/Axedyson/syncbase/pulls">
    <img alt="Pull requests are welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg">
  </a>
  <a href="https://github.com/Axedyson/syncbase/actions/workflows/lint.yml">
    <img alt="Lint workflow" src="https://img.shields.io/github/workflow/status/Axedyson/syncbase/Lint?label=Lint">
  </a>
  <a href="https://github.com/Axedyson/syncbase/actions/workflows/codeql.yml">
    <img alt="CodeQL workflow" src="https://img.shields.io/github/workflow/status/Axedyson/syncbase/CodeQL?label=CodeQL">
  </a>
  <a href="https://github.com/Axedyson/syncbase/actions/workflows/tests.yml">
    <img alt="Tests workflow" src="https://img.shields.io/github/workflow/status/Axedyson/syncbase/Tests?label=Tests">
  </a>
  <a href="https://github.com/Axedyson/syncbase/actions/workflows/ui_tests.yml">
    <img alt="UI Tests workflow" src="https://img.shields.io/github/workflow/status/Axedyson/syncbase/UI%20Tests?label=UI%20Tests">
  </a>
<p>
