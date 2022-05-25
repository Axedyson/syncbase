# Server

Will add more helpful documentation for contributors related to the server here later!

### Notes

- Since GitHub [deletes](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows#usage-limits-and-eviction-policy) all caching after 7 days, Jest will fail because it can't handle no available cache when running in CI apparently. The only fix as of now, is simply rerunning the failed jest job.
