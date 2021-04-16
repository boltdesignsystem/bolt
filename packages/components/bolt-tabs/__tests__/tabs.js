import {
  render,
  stopServer,
  html,
  renderWC,
} from '../../../testing/testing-helpers';
import schema from '../tabs.schema';
const { align, inset } = schema.properties;
let page, fixtures;

beforeEach(async () => {
  await page.evaluate(() => {
    document.body.innerHTML = '';
  });
  await page.setViewport({ width: 600, height: 200 });
});

beforeAll(async () => {
  page = await global.__BROWSER__.newPage();
  await page.goto('http://127.0.0.1:4444/', {
    timeout: 0,
  });

  const baseResults = await render('@bolt-components-tabs/tabs.twig', {
    panels: [
      {
        label: 'Tab label 1',
        content: 'This is the tab content.',
      },
      {
        label: 'Tab label 2',
        content: 'This is the tab content.',
      },
      {
        label: 'Tab label 3',
        content: 'This is the tab content.',
      },
    ],
  });

  fixtures = {
    baseResults,
  };
});

afterAll(async () => {
  await stopServer();
  await page.close();
});

describe('Bolt Tabs', () => {
  // beforeAll(async () => {
  //   const teaserData = {
  //     layout: 'responsive',
  //     gutter: 'large',
  //     type: 'external-link',
  //     eyebrow_text: 'Featured',
  //     headline: {
  //       text: 'Teaser headline',
  //       tag: 'h2',
  //       size: 'xlarge',
  //       link_attributes: {
  //         href: 'https://www.pega.com',
  //       },
  //     },
  //     description: {
  //       content:
  //         'Aliqua voluptate amet do laborum culpa tempor consectetur culpa consectetur ea. Ea officia quis do enim.',
  //     },
  //     time: '10 min read',
  //     status: {
  //       views: '28k',
  //       locked: true,
  //     },
  //     attributes: {
  //       class: 'js-bolt-target-teaser',
  //     },
  //   };

  //   // Share
  //   const shareMenu = await render('@bolt-components-share/share.twig', {
  //     display: 'menu',
  //     text: 'Share this content',
  //     sources: [
  //       {
  //         name: 'facebook',
  //         url:
  //           'https://www.facebook.com/sharer/sharer.php?u=https://pega.com&amp;src=sdkpreparse',
  //       },
  //       {
  //         name: 'twitter',
  //         url:
  //           'https://twitter.com/intent/tweet?url=https://pega.com&text=Sample%20Share%20Text&via=pega&hashtags=boltDesignSystemRocks!',
  //       },
  //       {
  //         name: 'linkedin',
  //         url: 'https://www.linkedin.com/shareArticle?url=https://pega.com',
  //       },
  //       {
  //         name: 'email',
  //         url: 'mailto:?&body=Sample%20Text%20--%20https%3A//pega.com',
  //       },
  //     ],
  //     copy_to_clipboard: {
  //       text_to_copy: 'https://pega.com',
  //     },
  //   });

  //   const iconShare = await render('@bolt-components-icon/icon.twig', {
  //     name: 'share',
  //   });

  //   const sharePopoverTrigger = await render(
  //     '@bolt-elements-text-link/text-link.twig',
  //     {
  //       content: 'Share',
  //       icon_before: iconShare.html,
  //       reversed_underline: true,
  //       attributes: {
  //         type: 'button',
  //       },
  //     },
  //   );

  //   const share = await render('@bolt-components-popover/popover.twig', {
  //     trigger: sharePopoverTrigger.html,
  //     content: shareMenu.html,
  //     spacing: 'none',
  //     boundary: '.js-bolt-target-teaser',
  //   });

  //   // Like
  //   const iconHeart = await render('@bolt-components-icon/icon.twig', {
  //     name: 'heart-open',
  //   });

  //   const like = await render('@bolt-elements-text-link/text-link.twig', {
  //     content: 'Like',
  //     icon_before: iconHeart.html,
  //     reversed_underline: true,
  //     attributes: {
  //       type: 'button',
  //       class: 'js-bolt-like-button',
  //     },
  //   });

  //   // Image
  //   const image16x19 = await render('@bolt-components-image/image.twig', {
  //     src: '/fixtures/promo-16x9-ai.jpg',
  //     alt: 'Alt text.',
  //   });

  //   fixtures = {
  //     teaserData,
  //     share,
  //     like,
  //     image16x19,
  //   };
  // }, timeout);

  // beforeAll(async () => {
  //   const baseResults = await render('@bolt-components-tabs/tabs.twig', {
  //     panels: [
  //       {
  //         label: 'Tab label 1',
  //         content: 'This is the tab content.',
  //       },
  //       {
  //         label: 'Tab label 2',
  //         content: 'This is the tab content.',
  //       },
  //       {
  //         label: 'Tab label 3',
  //         content: 'This is the tab content.',
  //       },
  //     ],
  //   });

  //   tabsInnerHTML = `
  //     <bolt-tabs>
  //       <bolt-tab-panel>
  //         <div slot="label">Tab label 1</div>
  //         Tab panel 1
  //       </bolt-tab-panel>
  //       <bolt-tab-panel>
  //         <div slot="label">Tab label 2</div>
  //         Tab panel 2
  //       </bolt-tab-panel>
  //       <bolt-tab-panel>
  //         <div slot="label">Tab label 3</div>
  //         Tab panel 3
  //       </bolt-tab-panel>
  //     </bolt-tabs>
  //   `;
  //   fixtures = {
  //     baseResults
  //   };
  // });

  test('Twig usage', async () => {
    // const results = await render('@bolt-components-tabs/tabs.twig', {
    //   panels: [
    //     {
    //       label: 'Tab label 1',
    //       content: 'This is the tab content.',
    //     },
    //     {
    //       label: 'Tab label 2',
    //       content: 'This is the tab content.',
    //     },
    //     {
    //       label: 'Tab label 3',
    //       content: 'This is the tab content.',
    //     },
    //   ],
    // });
    //results will move to beforeAll
    // basicTest(html);
    // await expect(results.ok).toBe(true);
    await expect(fixtures.baseResults.html).toMatchSnapshot();
  });

  // align.enum.forEach(option => {
  //   test(`Align: ${option}`, async () => {
  //     const tabsOuter = await page.evaluate(
  //       async (option, tabsInnerHTML) => {
  //         const wrapper = document.createElement('div');
  //         wrapper.innerHTML = tabsInnerHTML;
  //         document.body.appendChild(wrapper);

  //         await customElements.whenDefined('ssr-keep');
  //         await customElements.whenDefined('bolt-tabs');
  //         const tabs = document.querySelector('bolt-tabs');
  //         tabs.setAttribute('align', option);
  //         return tabs.outerHTML;
  //       },
  //       option,
  //       tabsInnerHTML,
  //     );
  //     const renderedHTML = await html(tabsOuter);
  //     await expect(renderedHTML).toMatchSnapshot();
  //   });
  // });

  inset.enum.forEach(async option => {
    test(`Inset: ${option}`, async () => {
      // console.log(tabsInnerHTML);
      // create a wrapping div to sue setAttribute
      // console.log(tabsInnerHTML.setAttribute('inset', option));
      // const { outerHTML } = await renderWC('bolt-tabs', tabsInnerHTML, page);
      //console.log(outerHTML);
      // const tabsOuter = await page.evaluate(
      //   async (option, tabsInnerHTML) => {
      //     const wrapper = document.createElement('div');
      //     wrapper.innerHTML = tabsInnerHTML;
      //     document.body.appendChild(wrapper);
      //     await customElements.whenDefined('ssr-keep');
      //     await customElements.whenDefined('bolt-tabs');
      //     const tabs = document.querySelector('bolt-tabs');
      //     const tabPanels = Array.from(
      //       document.querySelectorAll('bolt-tab-panel'),
      //     );
      //     tabs.setAttribute('inset', option);
      //     [tabs, ...tabPanels].forEach(el => el.requestUpdate());
      //     await Promise.all([
      //       tabs.updateComplete,
      //       [tabs, ...tabPanels].forEach(el => {
      //         return el.updateComplete;
      //       }),
      //     ]);
      //     return tabs.outerHTML;
      //   },
      //   option,
      //   tabsInnerHTML,
      // );
      // const renderedHTML = await html(tabsOuter);
      const newDiv = document.createElement('div');
      newDiv.append(fixtures.baseResults.html);
      // console.log(fixtures.baseResults)
      console.log(newDiv.getElementsByTagName('bolt-tabs'));
      await expect(fixtures.baseResults.html).toMatchSnapshot();
    });
  });
});

describe('Web Component usage', () => {
  test('Shadow DOM', async () => {
    const { innerHTML } = await renderWC(
      'bolt-tabs',
      fixtures.baseResults.html,
      page,
    );
    await expect(innerHTML).toMatchSnapshot();
  });

  test('Light DOM', async () => {
    const { outerHTML } = await renderWC(
      'bolt-tabs',
      fixtures.baseResults.html,
      page,
    );
    await expect(outerHTML).toMatchSnapshot();
  });
});
