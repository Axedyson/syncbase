<p align="center">
  <a href="http://syncbase.tv">
    <img src="logo.svg">
  </a>
</p>

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

I welcome any contribution, literally!

### How to contribute (will add a proper and more detailed guide later)

#### Project setup

- I highly recommend to use vscode, but it's also fine to use a different code editor!
- Have node installed, preferably a version that is minimum 14 (I'm using v14.18.1 LTS)
- Have yarn installed
- Have postgresql installed, also the user postgres needs to have the password postgres
- Have redis installed
- Clone this repo
- Run `yarn` inside of the root folder of the repo to install all necessary packages
- Two ways to run the node.js backend:
  - `yarn workspace @syncbase/server dev`
  - or `cd packages/server && yarn dev`
- Two ways to run the next.js frontend:
  - `yarn workspace @syncbase/web dev`
  - or `cd packages/web && yarn dev`

#### Contribution flow

- Fork this repo and submit a pull request pointing to the main branch of the original repo

### TODO

- Urql setup & Build register and login page and connect them to the user server api
- Implement predev and prestart scripts in package.json files!
- Should you put `packages/web/src/graphql/hooks.ts` in .gitingore? (https://github.com/dotansimha/graphql-code-generator/discussions/4253), if you do make sure to reevaluate the .eslintrc.js file with the ignore pattern!
- Do I really need `react-is` for urql ssr?
- Do I really need all the graphql-code-gen packages installed in package.json in web?
- Read more up on graphql-code-gen & zod
- Implement Urql graphcache
- Properly implement CSRF protection
- Properly implement session cookie expiration
- Storybook
- Actually develop the project
- Deploy web on vercel and server and it's services on DO droplet and maybe some automatic deployment with gh actions
- Add docker & docker-compose for development?
- Maybe add standard-version/semantic-release?
- Add tests e.g. jest for unit and integration tests and crypress for E2E tests

### Notes

- Use dataloder for relational data fetching
- Implement SEO optimizations later
- Implement OG meta tags later
- Datadog?
- Sentry?
