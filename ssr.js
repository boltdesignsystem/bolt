const puppeteer = require('puppeteer');
const path = require("path");





// const babelConfig = (() => {
//   try {
//     return require(path.join(process.cwd(), args.babel));
//   } catch (e) { }
// })();
// // require("babel-register")(babelConfig.preset);


// const file = 'src/_patterns/02-components/bolt-button/dist/bolt-button.ssr.js';
// const requiredFile = require(path.resolve(file));
// const addElement = tag => document.body.appendChild(document.createElement(tag));

// const content = args.content ? args.content : `<bolt-button size="medium" style="secondary">Test Button</bolt-button>`;


// const content = ;
// const args = require("yargs").argv;

// (() => {


//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('http://localhost:8080/ssr.html');

//   await page.evaluate(() => document.querySelector('#ssr').innerHTML = args.content || '<bolt-button size="medium" style="secondary">Test Button</bolt-button>');
//   // //


//   await page.addScriptTag({
//     path: args.script || 'src/_patterns/02-components/bolt-button/dist/bolt-button.ssr.js'
//   });

//   const html = await page.$eval('#ssr', e => e.innerHTML);
//   console.log(html);

//   await browser.close();
// })();

const args = require("yargs").argv;
// const content = args.content || '<bolt-button size="medium" style="secondary">Test Button</bolt-button>';
const script = args.script || 'src/_patterns/02-components/bolt-button/dist/bolt-button.ssr.js';

(async(content) => {
  console.log(content);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/ssr.html');

  await page.evaluate(() => document.querySelector('#ssr').innerHTML = '<bolt-button size="medium" style="secondary">Test Button</bolt-button>');
  // //


  page.addScriptTag({
    path: script
  });

  const html = page.$eval('#ssr', e => e.innerHTML);
  console.log(html);

  return browser.close();
})();
