# Server

Will add more helpful documentation for contributors related to the server here later!

To build the docker image run this command in the root directory of the project:

```bash
docker build -f packages/server/Dockerfile -t server:latest .
```

Also we use multi-stage builds in the dockerfile so the image size is optimized

### TODO

- Database migrations should run on app startup, not via the Mikro-Orm CLI and make sure that the migrations are [compiled to JS](https://mikro-orm.io/docs/migrations/#running-migrations-in-production)
- Write proper backend tests
- Create an ER-model of the database and make sure it's normalized properly
- [Configure firewalls](https://github.com/digitalocean/droplet-1-clicks/blob/master/dokku-20-04/template.json#L73-L74) for [droplet](https://github.com/digitalocean/droplet-1-clicks/blob/master/dokku-20-04/files/etc/update-motd.d/99-one-click#L10-L12)
- Right now a deployment collison could occur in CI when two commits are pushed to the main branch at or about the same time. To fix this issue we could do something along these lines: https://dokku.com/docs/deployment/application-management/#unlocking-app-deploys

### Notes

- If the DigitalOcean droplet has been recreated make sure to wait for DNS propagation to finish for the host `api.syncbase.tv` before running the following command:
  - `dokku letsencrypt:enable server && dokku letsencrypt:cron-job --add`
  - Be aware that we can only add SSL to the same domain 5 times a week
- Maybe use this to build the docker image: https://github.com/Dcard/yarn-plugins/tree/master/packages/docker-build
- Maybe use this to optimize it even further: https://github.com/docker-slim/docker-slim
- Optimize the docker image size even further e.g. by removing `*.d.ts` files from the dist folder after mikro-orm cache generation
- Maybe use yarn v2 (yarn berry) instead of the default yarn v1 in the dockerfile: https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#upgradingdowngrading-yarn especially because of [this](https://github.com/mikro-orm/mikro-orm/discussions/3322#discussioncomment-3448202)
- Maybe use `CMD [ "node", "dist/index.js" ]` instead of `yarn`: https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#cmd
- Maybe use this for terraform remote connection: https://www.terraform.io/language/resources/provisioners/connection#connecting-through-a-bastion-host-with-ssh
- Maybe configure the digitalocean dokku droplet like the way it's configured [here](https://github.com/digitalocean/droplet-1-clicks/blob/master/dokku-20-04/template.json)
