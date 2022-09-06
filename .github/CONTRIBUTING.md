# Contributing to Syncbase

## What kinds of contributions do we accept?

Literally everything. We don't care about how little the contriubtion is, it could be as little as correcting a grammar mistake. It doesn't even have to be a code related contribution, it could also be a bug report, or an idea for a new feature you would like others to implement for you.
Now having said that, we expect you to agree and follow our [CODE_OF_CONDUCT.md](https://github.com/Axedyson/syncbase/blob/main/.github/CODE_OF_CONDUCT.md) guidelines when contributing and generally participating in this project.

## Security reporting and getting help

As soon as you think you've found a security bug/issue, please quickly visit our [SECURITY.md](SECURITY.md) to see how to report it!
And if you get lost during the setup guide listed below or just in general have questions, you can take a look at our [SUPPORT.md](SUPPORT.md) document to see how to get help.

## Bug reports

When reporting a bug please ensure your description is clear and has sufficient instructions on how to repoduce the bug and that the issue has the label `bug` attached to it. You can use our [bug template](https://github.com/Axedyson/syncbase/issues/new?assignees=&labels=bug&template=bug_report.md&title=) as guidance. Also before reporting a bug make sure it hasn't already been reported by someone else in the [bug list](https://github.com/Axedyson/syncbase/issues?q=is%3Aopen+is%3Aissue+label%3Abug)!
Also please make sure to only close issues as `completed` if they have actually solved a bug, or close them as `not planned` if the issue has been dropped for some reason!

## Feature requests and roadmap

Feature requests by the community are highly encouraged. Please feel free to create an issue or to upvote an existing issue describing
a feature you would like to have implemented. Feature requests don't have to be a whole new feature/addition to the product, it could also just be a small enhancement that makes some small part of the user experience a bit smoother or something like that. To create a feature request, make sure you attach the label `enhancement` to it and make sure that you provide a clear and concise description of what the feature is about and why you want it implemented. You can use our [feature request template](https://github.com/Axedyson/syncbase/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=) as guidance.
Also again as said before, please make sure to only close issues as `completed` if the feature request the issue is describing has been implemented, or close them as `not planned` if the feature request has been dropped for some reason!

Now before creating a feature request please make sure that it hasn't already been created by someone else by looking at the [enhancement list](https://github.com/Axedyson/syncbase/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement). You can also take a look at our [roadmap](https://github.com/Axedyson/syncbase/discussions/14) to get an idea of the current status of the project and where we are headed. And to get a more concrete status/roadmap of the project you can vist our [project board](https://github.com/users/Axedyson/projects/1) which houses feature requests to be implemented and bugs to be fixed.
It's a good idea to keep yourself up to date with [discussion announcements](https://github.com/Axedyson/syncbase/discussions/categories/announcements) to get general updates surrounding the project.

## Codebase

First of all our github repository is a monorepo that as of now contains two separate packages/codebases managed by [yarn workspaces](https://yarnpkg.com/features/workspaces):

| Codebase
| ------------------------------------------------ |
| [Next.js frontend server](../packages/web/) |
| [Apollo express api server](../packages/server/) |

In the future when we're going to build the desktop application we will need an additional codebase.

The frontend server is deployed on Vercel, and the api server is deployed on DigitalOcean inside of a droplet. We also host a postgresql database and a redis data store for user session management on the same droplet. You can actually see the whole deployment configuration in our [terraform file](../main.tf).

We use [chromatic](https://www.chromatic.com/) to host our UI components, and [storybook](https://storybook.js.org/) to make it easier for us to develop them:

| Storybook                                                                                                  |
| ---------------------------------------------------------------------------------------------------------- |
| [Storybook Syncbase library](https://main--619aa417876c17003a24f46a.chromatic.com)                         |
| [Chromatic Syncbase library](https://www.chromatic.com/library?appId=619aa417876c17003a24f46a&branch=main) |

## Coding guidelines

- If you don’t need to explicitly `await` something in a function, then don’t use `async` and `await`, just return the promise right away, this applies especially to [typegraphql resolver functions](https://typegraphql.com/docs/resolvers.html)!
- If you’re using [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install) please make sure you have [wslg](https://docs.microsoft.com/en-us/windows/wsl/tutorials/gui-apps) installed which requires windows 11. This is so you can run playwright testing in headed mode, since it’s way easier to debug stuff and write E2E tests using [playwright’s codegen](https://playwright.dev/docs/codegen) for example!
- When the desire is to enable partial graphql errors, we want to make a field that throws a specific error nullable as stated under the heading _Handling partial failures with nullable types_ in this [article](https://www.apollographql.com/blog/graphql/error-handling/full-stack-error-handling-with-graphql-apollo/)

## Development environment setup

Now at last you get to the concrete steps of setting up the development environment:

- As an editor we highly recommend Vscode, but it's also fine to use a different code editor. The reason is that we use some [vscode extensions](../.vscode/extensions.json) that make the development experience a bit smoother.
- Make sure you have node.js installed on your system as this project requires the use of javascript/typescript in a non browser environment.
- We use [yarn](https://yarnpkg.com/) and not npm or other node.js/javascript package managers
- Now you can begin cloning this repo
- Run `yarn` inside of the root folder of the repo to install all the necessary npm packages
- Now to setup the postgresql database and the redis data store you can do it in two ways:
  - Either install them natively and start them manually
  - Or use the provided [docker-compose.yml](/docker-compose.yml) file to spin up a postgresql and redis container, by running `docker compose up` in the root directory of the project. (recommended because of ease of use)
- No matter which way you start the postgresl database there needs to be a development database called `syncbase` and its database relations needs to be created, which can be done by simply starting the server; `yarn workspace @syncbase/server dev`, as by doing that the server will automatically create the database and run a database migration.
- After that you can run `yarn workspace @syncbase/server mikro-orm seeder:run` to seed the database
- The two below steps requires that the database and the redis instance is running
- Here is how to run the [Apollo express api server](../packages/server): `yarn workspace @syncbase/server dev`
- While the api server is running, go ahead and simultaneously start the [Next.js frontend server](../packages/web/): `yarn workspace @syncbase/web dev`

## Pull requests and the development process

We accept pull requests as a means of submitting changes to the project which will get reviewed before being merged in. Before submitting any pull requests please ensure that there aren't other open [pull requests](https://github.com/Axedyson/syncbase/pulls) for the same change! To actually submit a change, fork this repo and remember to enable actions to run on the fork, then submit a pull request pointing to the `main` branch of the original repo with your new changes. Also please write new tests for your changes as applicable. There is no specific commit naming convention to follow, just make sure that the pull request name is nice and descriptive and that you follow our pull request template! We will be using the simple [Github Flow](https://docs.github.com/en/get-started/quickstart/github-flow) branch-based workflow.

## Thank you and closing thoughts

Thank you for your interest in contributing to Syncbase! We love your input! We want to make contributing to this project as easy and transparent as possible. We've really tried to make the development environment as nice as possible, if you have any ideas of how to make it even better, it would be great if you could tells us about it through a pull request, feature request or an idea in the dicussion forum!

All efforts to contribute are highly appreciated, we recommend you talk to a maintainer prior to spending a lot of time making a pull request that may not align with the project roadmap.

Also if you're running on a non-linux based OS like Windows you probably can’t develop on this project since some scripts listed in one of the `package.json` files utilizes linux commands, but we will happily update those scripts to be OS agnostic. We can also add a `.gitattributes` file to normalize line endings of files if you want!
