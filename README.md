<p align="center">
  <a href="http://syncbase.tv">
    <img src="logo.svg">
  </a>
</p>

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

I welcome any contribution!

### How to contribute (will add a proper and more detailed guide later)

#### Project setup

- Have node installed, preferably node v14.18.1 (that's the version I'm using)
- Have yarn installed
- Clone this repo
- cd into the root folder of the repo: `cd syncbase/`
- and then simply run `yarn`

#### Contribution flow

- Fork this repo and submit a pull request to the main branch of the original repo

### TODO

- Actually develop the project (We should first get a handle on the data flow between the server and the web)
  - Build register and signup page and connect them to the user api + urql setup!
  - How should we implement CSRF protection?
  - How should session cookie expiration be handled?
- Deploy web on vercel and server and it's services on DO droplet and maybe some automatic deployment with gh actions
- Add docker & docker-compose for development maybe
- Maybe add standard-version/semantic-release
- Add tests e.g. jest for unit and integration tests and crypress for E2E tests

### Notes

- Use dataloder for relational data fetching
- Maybe we don't need stylelint since we currently have zero css files
