import puppeteer from 'puppeteer';
import prettier from 'prettier';
import highlight from 'cli-highlight';
import { shutDownSSRServer } from './ssr-server';

export async function renderPage(port) {
  const url = `http://localhost:${port}/ssr`;

  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto(url);
  await page.content(); // serialized HTML of page DOM.

  const html = await page.evaluate(() => {
    // strip out any <script> tags from the SSR-rendered body HTML
    function stripScripts(s) {
      var div = document.createElement('div');
      div.innerHTML = s;
      var scripts = div.getElementsByTagName('script');
      var i = scripts.length;
      while (i--) {
        scripts[i].parentNode.removeChild(scripts[i]);
      }
      return div.innerHTML;
    }

    const code = document.body.innerHTML;

    // strip out any lit-html comments in the rendered HTML before returning
    return stripScripts(code).replace(/<!---->/g, '');
  });

  const renderedHTML = prettier.format(html, {
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    jsxBracketSameLine: true,
    parser: 'html',
  });

  console.log(
    highlight.highlight(renderedHTML, {
      language: 'html',
      ignoreIllegals: true,
    }),
  );

  await browser.close();
  await shutDownSSRServer();
}
