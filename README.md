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
- To create the necessary development database called `syncbase` and it's relations, simply start the server, `yarn dev` inside the `packages/server` folder
- After that you can run `yarn workspace @syncbase/server mikro-orm seeder:run` to seed the database
- Make sure that the postgres instance and the redis instance are up and running before starting the node.js backend
- Here is how to run the [node.js backend server](https://github.com/Axedyson/syncbase/tree/main/packages/server): `yarn workspace @syncbase/server dev`
- And here is how to run the [next.js frontend server](https://github.com/Axedyson/syncbase/tree/main/packages/web): `yarn workspace @syncbase/web dev`

### Contribution flow

- Fork this repo, remember to enable actions to run on the fork and then submit a pull request pointing to the `main` branch of this repo with your new changes. There is no specific commit naming convention to follow, just make sure that the pull request name is nice and descriptive! We will be using the [Github Flow](https://docs.github.com/en/get-started/quickstart/github-flow) branching strategy

| Storybook                                                                                         |
| ------------------------------------------------------------------------------------------------- |
| [Storybook library](https://main--619aa417876c17003a24f46a.chromatic.com)                         |
| [Chromatic library](https://www.chromatic.com/library?appId=619aa417876c17003a24f46a&branch=main) |

---

## Notes

- In the future we want to [organize by feature](https://softwareengineering.stackexchange.com/questions/338597/folder-by-type-or-folder-by-feature) rather than by type
- More extensive Docker and Docker Compose configuration to provide easier setup and development e.g. [vscode development containers](https://code.visualstudio.com/docs/remote/containers)
- standard-version/semantic-release/changeset/keepachangelog?
- Sentry?
- Datadog?
- [DNSSEC](https://www.namecheap.com/support/knowledgebase/article.aspx/9718/2232/nameservers-and-tlds-supportedunsupported-by-dnssec/) on namecheap?
- [terraform security](https://www.checkov.io/4.Integrations/GitHub%20Actions.html)?

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
  <a href="https://github.com/Axedyson/syncbase/actions/workflows/ui-tests.yml">
    <img alt="UI Tests workflow" src="https://img.shields.io/github/workflow/status/Axedyson/syncbase/UI%20Tests?label=UI%20Tests">
  </a>
  <a href="https://github.com/Axedyson/syncbase/actions/workflows/deploy.yml">
    <img alt="UI Tests workflow" src="https://img.shields.io/github/workflow/status/Axedyson/syncbase/Deploy?label=Deploy">
  </a>
<p>
