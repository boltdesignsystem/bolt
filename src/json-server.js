/**
 * json-server.index.js
 */
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const jsonServer = require('json-server');
const globby = require('globby');

const server = jsonServer.create();
const port = 3002;

let obj = {};

globby(['./packages/bolt-common/**/*.data.json']).then(paths => {
  console.log(paths);

  paths.map((file) => {
    console.log(file);
    _.extend(obj, require(path.resolve(__dirname, '../', file)));
  });

  // const newObject = {
  //   "api": obj
  // };

  // newObject
  // console.log(newObject);


  const router = jsonServer.router(obj);
  const middlewares = jsonServer.defaults();

  server.use(middlewares);
  
  server.use(router);
  // server.use(router);

  // , function (req, res) {
  //   res.redirect('/api/' + req.params.id);
  // });

  server.listen(port, () => {
    console.log(`JSON Server is running at ${port}`);
  });

  //=> ['unicorn', 'rainbow']
});

// files.forEach((file) => {
//   console.log(file);
//   if (file.indexOf('.data.json') > -1) {
//     console.log(file);
//     _.extend(obj, require(path.resolve(__dirname, '../packages/bolt-common/', file)));
//   }
// });




// server.use(jsonServer.rewriter({
//   '/api/*': '/:resource'
// }));

// server.use(router);


