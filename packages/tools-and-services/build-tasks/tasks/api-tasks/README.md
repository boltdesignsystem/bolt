API tasks are a new (potentially emerging) pattern to help with gathering specific pieces of data that get collected and added to the Bolt Global Data store.

### Examples of this include:
- Determining what versions of Bolt are available (previously located in `@bolt/build-tools/utils`)
- Generating a listing of the different versions of Bolt components published to NPM
- Building a list of Pattern Lab URLs to perform visual regression testing between the previous and next versions of the system
- Aggregating the data needed for the Status Board component + compiling using the actual Twig template (via the `@bolt/twig-renderer`)

As far as related dependencies / related tasks, these examples listen for / emmit events to trigger other tasks as a quick interim solution. Ultimately, much of this might get replaced by something like Apollo Server / node tasks that subscribe to one-another.
