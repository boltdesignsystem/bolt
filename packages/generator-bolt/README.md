# Bolt Component Generator (powered by Yeoman)

## Generating A New Component (only available inside the Bolt monorepo for now)

To generate a new Bolt component, run the following inside the root of the Bolt monorepo and walk through the CLI prompts.

```
yarn create:create-component
```

You can also run `yarn cc` for short!

### Auto-fill out CLI options:

Currently two CLI options can be pre-filled out -- `name` and `description` which only requires you to hit ENTER to confirm the default value is what you want.

```
yarn cc --name "carousel" --description "an awesome carousel component"
```

Note: There's still some work left to be done to finish deeply wiring up the Bolt build tools with task-specific generators like this one. Even more awesome updates involving this are still in progress!