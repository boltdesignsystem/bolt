---
title: .boltrc Config 
---

The order goes like this, as this list increases, the later override the earlier
Order inspired by https://www.npmjs.com/package/rc#standards

1. Each property has a default
2. `userConfig` from `.boltrc.js` that's in same cwd as where `bolt` was ran, unless they use `--config-file path/to/.boltrc.js`
3. Env Vars with `bolt_` prefix; `bolt_verbosity=1` will override `config.verbosity` - case matters!
4. Certain command line options like `bolt build --verbosity 5` - not every config option is overridable this way. Run `bolt --help` or `bolt build --help` to see options.

For both 3 & 4, it doesn't support deep merges, so only top level properties.
