# Web

Will add more helpful documentation for contributors related to the frontend here later!

### Data Fetching

All authenticated content should be fetched client side, since it doesn't matter that authenticated content doesn't get indexed by search engines. Everything else should be fetched server side for better SEO performance. We will be using next-urql for this.

### TODO

- Write proper storybook interaction tests where snapshots are taken by chromatic after an interaction test has run (use interaction tests to trigger certain states we want to visually take a snapshot of!)
- Internationalize screen reader text. An example of screen reader text is located in the toast component
- A script to find orphaned translation keys
- Another script to synchronize i18n translations files

### Notes

- Whenever the playwright npm package has been updated in our repo, it's probably a good idea to run the following command: `yarn playwright install --with-deps` in the `./packages/web/` directory
- For people who like docker there is [this image](https://playwright.dev/docs/docker) that contains a playwright installation and it's browser dependencies, not sure how to make it work with this project though
- Soon chromatic will be able to run [accessibility tests](https://storybook.js.org/docs/react/writing-tests/test-runner#whats-the-difference-between-chromatic-and-test-runner) automatically without us having to use the test runner explicitly, we'll wait for the update to arrive
