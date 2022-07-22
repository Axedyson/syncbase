# Server

Will add more helpful documentation for contributors related to the server here later!

To build the docker image run this command in the root directory:

```bash
docker build -f ./packages/server/Dockerfile -t server:latest .
```

Also we use multi-stage builds in the dockerfile so the image size should be optimized

### TODO

- Migrations should run on app start up not via the Mikro-Orm CLI and make sure the migrations are [compiled to JS](https://mikro-orm.io/docs/migrations/#running-migrations-in-production)
- Write proper backend tests
- Optimize the docker image size even further e.g. by removing `*.d.ts` files from dist folder after cache generation
- Create an ER-model of the database and make sure it's normalized properly

### Notes

- Maybe use this to build the docker image: https://github.com/Dcard/yarn-plugins/tree/master/packages/docker-build
- Maybe use yarn v2 (yarn berry) instead of the default yarn v1 in the dockerfile
