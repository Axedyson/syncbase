# Server

Will add more helpful documentation for contributors related to the server here later!

To build the docker image run this comamnd in the root directory:

```bash
docker build -f ./packages/server/Dockerfile -t server:latest .
```

Also we use multi-stage builds in the dockerfile so the image size should be optimized

### TODO

- Write proper backend tests
- Create an ER-model of the database and make sure it's normalized properly
