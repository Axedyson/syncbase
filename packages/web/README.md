# Web

Will add more helpful documentation for contributors related to the frontend here later!

## TODO

- Internationalize screen reader text. An example of screen reader text is located in the toast component
- A script to find orphaned translation keys
- Another script to synchronize i18n translations files
- We should probably [cache playwright deps](https://github.com/microsoft/playwright/issues/7249#issuecomment-1154603556) to speed things up
- Soon chromatic will be able to run [accessibility tests](https://storybook.js.org/docs/react/writing-tests/test-runner#whats-the-difference-between-chromatic-and-test-runner) automatically without us having to use the test runner explicitly, we'll wait for the update to arrive

## Notes

- Whenever the playwright npm package has been updated in your local cloned version of the repo, it's probably a good idea to run the following command: `yarn playwright install --with-deps` in the `./packages/web/` directory locally just in case
- For people who like docker there is [this image](https://playwright.dev/docs/docker) that contains a playwright installation and it's browser dependencies, not sure how to make it work with this project though
- Implement SEO optimizations later
- Implement OG meta tags later
- Implement a page that showcases all of the open source libraries used in the project just like how [discord does it](https://discord.com/acknowledgements)
