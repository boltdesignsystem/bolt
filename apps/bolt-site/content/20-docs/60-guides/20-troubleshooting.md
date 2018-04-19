---
title: Troubleshooting
---

**Below you'll find answers to some common problems and how best to solve them** 

1. Flushing `node_modules`

Errors that arise during use of the command line tools (for example, `npm start` fails), can often be fixed by running...

```bash
rm -rf node_modules
yarn
npm run setup
```