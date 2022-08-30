# Server

Will add more helpful documentation for contributors related to the server here later!

## TODO

- Create an ER-model of the database and make sure it's normalized properly

### Droplet Security

- [Configure the droplet properly](https://docs.digitalocean.com/tutorials/recommended-droplet-setup/)
- https://github.com/digitalocean/droplet-1-clicks/blob/master/dokku-20-04/template.json#L73-L74
- https://github.com/digitalocean/droplet-1-clicks/blob/master/dokku-20-04/files/etc/update-motd.d/99-one-click#L10-L12
- We should probably be more granular when it comes to [exclusion](https://bobbyhadz.com/blog/typescript-exclude-test-files-from-compilation) of certain files from typescript build compilation output e.g. the file [`DatabaseSeeder.ts`](https://github.com/Axedyson/syncbase/blob/main/packages/server/src/seeders/DatabaseSeeder.ts)?

## Notes

- Maybe configure the digitalocean dokku droplet like the way it's configured [here](https://github.com/digitalocean/droplet-1-clicks/blob/master/dokku-20-04/template.json)
- Maybe use this for terraform remote connection: https://www.terraform.io/language/resources/provisioners/connection#connecting-through-a-bastion-host-with-ssh
- Right now maybe a deployment collison could occur in CI when two commits are pushed to the main branch at or about the same time. To fix this issue we could do something along these lines: https://dokku.com/docs/deployment/application-management/#unlocking-app-deploys
- We can only add SSL to the same domain 5 times a week, meaning that only the first 5 times a droplet has been redeployed during a week will have SSL enabled.
- Maybe use this to build the docker image: https://github.com/Dcard/yarn-plugins/tree/master/packages/docker-build
- Maybe use this to optimize the docker image even further: https://github.com/docker-slim/docker-slim
- Optimize the docker image size even further e.g. by removing `*.d.ts` files from the dist folder after mikro-orm cache generation
- Maybe use yarn v2 (yarn berry) instead of the default yarn v1 in the dockerfile: https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#upgradingdowngrading-yarn especially because of [this](https://github.com/mikro-orm/mikro-orm/discussions/3322#discussioncomment-3448202)
- [docker linting](https://github.com/jbergstroem/hadolint-gh-action)?
- Maybe use `CMD [ "node", "dist/index.js" ]` instead of `yarn`: https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#cmd
