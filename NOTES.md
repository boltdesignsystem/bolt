- As a team, how do we handle getting pre-released Bolt code into Drupal (ex. Pega Academy)?

  ```json
  {
    "name": "pegawwwd8",
    "version": "2.14.0",
    "private": true,
    "dependencies": {
      "@bolt/build-tools": "^2.14.0",
      "@bolt/components-accordion": "^2.14.0",
      "@bolt/components-band": "^2.14.0",
      "@bolt/components-button": "^2.14.0",
      "@bolt/components-button": "^2.14.0-beta.1", // --> existing package, upcoming release
      "@bolt/components-toolbar": "next" // --> new package, yet to be initially released
    }
  }
  ```
> For reference, the original @bolt/build-tools strategy provided developers with a way to customize what packages get used at what version



- Bolt Canary releases (Test Early, Test Often)
Currently Bolt publishes Canary releases to NPM when code is merged down to master and the build passes

```json
{
  "name": "pegawwwd8",
  "version": "2.14.0",
  "private": true,
  "dependencies": {
    "@bolt/components-toolbar": "canary"
  }
}
```


- Do we want to try to go back to having a single package w/ all Bolt components 
```json
{
  "name": "pegawwwd8",
  "version": "2.14.0",
  "private": true,
  "dependencies": {
    "@bolt/components": "v3.0"
  }
}
```

- Pre-compiled components?
- Inline Twig includes