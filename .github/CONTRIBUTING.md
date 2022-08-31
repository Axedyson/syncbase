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

## Steps for creating good issues or pull requests.

...

## Links to external documentation, mailing lists, or a code of conduct.

...

## Community and behavioral expectations.

...

Please read [CODE_OF_CONDUCT.md](https://github.com/Axedyson/syncbase/blob/main/.github/CODE_OF_CONDUCT.md) for details on our code of conduct.
