import * as grapesjs from 'grapesjs'; // eslint-disable-line no-unused-vars

/* eslint-disable no-unused-vars */

/**
 * @param {grapesjs.Editor} editor
 * @returns {void}
 */
export function setupBlocks(editor) {
  /* eslint-enable no-unused-vars */
  const {
    /** @type {grapesjs.BlockManager} */
    BlockManager,
  } = editor;

  BlockManager.add('bolt-action-blocks', {
    label: 'Bolt Action Blocks',
    category: 'Bolt Components',
    content: `
<bolt-action-blocks bolt-component="">
  <ul class="c-bolt-action-blocks c-bolt-action-blocks--item-max-6 c-bolt-action-blocks--vertical-align-start c-bolt-action-blocks--bordered">
    <li class="c-bolt-action-blocks__item">
      <bolt-action-block bolt-component="">
        <a href="/products" id="p-79be2f13-6868-447f-9a96-7e06e2a6a724" data-google-analytics-et-processed="true" class="c-bolt-action-block"><div class="c-bolt-action-block__item c-bolt-action-block__icon">
          <bolt-icon name="product" size="xlarge" background="none">
          </bolt-icon>
        </div><div class="c-bolt-action-block__item c-bolt-action-block__text">
          Product Info
        </div></a>
      </bolt-action-block>
    </li>
    <li class="c-bolt-action-blocks__item">
      <bolt-action-block bolt-component="">
        <a href="/industries" id="p-3a1b7d87-28ba-4812-8be1-f619e92b266f" data-google-analytics-et-processed="true" class="c-bolt-action-block"><div class="c-bolt-action-block__item c-bolt-action-block__icon">
          <bolt-icon name="industries" size="xlarge" background="none">
          </bolt-icon>
        </div><div class="c-bolt-action-block__item c-bolt-action-block__text">
          Industry Solutions
        </div></a>
      </bolt-action-block>
    </li>
    <li class="c-bolt-action-blocks__item">
      <bolt-action-block bolt-component="">
        <a href="https://academy.pega.com" id="p-ade4ed2a-e1ed-41ff-9c6e-2a062fb2f237" data-google-analytics-et-processed="true" class="c-bolt-action-block"><div class="c-bolt-action-block__item c-bolt-action-block__icon">
          <bolt-icon name="training" size="xlarge" background="none">
          </bolt-icon>
        </div><div class="c-bolt-action-block__item c-bolt-action-block__text">
          Training and Certification
        </div></a>
      </bolt-action-block>
    </li>
    <li class="c-bolt-action-blocks__item">
      <bolt-action-block bolt-component="">
        <a href="/technology/vision-and-technology" id="p-ab68c135-8d42-44af-a6e2-112fc15d3369" data-google-analytics-et-processed="true" class="c-bolt-action-block"><div class="c-bolt-action-block__item c-bolt-action-block__icon">
          <bolt-icon name="vision" size="xlarge" background="none">
          </bolt-icon>
        </div><div class="c-bolt-action-block__item c-bolt-action-block__text">
          Vision and Technology
        </div></a>
      </bolt-action-block>
    </li>
    <li class="c-bolt-action-blocks__item">
      <bolt-action-block bolt-component="">
        <a href="/services" id="p-354bf286-be11-4492-bc8e-14379b65d027" data-google-analytics-et-processed="true" class="c-bolt-action-block"><div class="c-bolt-action-block__item c-bolt-action-block__icon">
          <bolt-icon name="partners" size="xlarge" background="none">
          </bolt-icon>
        </div><div class="c-bolt-action-block__item c-bolt-action-block__text">
          Services and Partners
        </div></a>
      </bolt-action-block>
    </li>
  </ul>
</bolt-action-blocks>
    `,
  });

  // @todo prevent link clicks from changing page
  // BlockManager.add('bolt-link', {
  //   label: 'Bolt Link',
  //   category: 'Bolt Components',
  //   content: {
  //     tagName: 'bolt-link',
  //     content: '<a href="">Placeholder Text</a>',
  //     script() {
  //       // alert('Hi');
  //       console.log('link element', this);
  //     },
  //     editable: true,
  //   },
  //   render({ model, className, el }) {
  //     el.addEventListener('click', e => {
  //
  //       // e.preventDefault();
  //     });
  //   },
  // });

  BlockManager.add('bolt-band-flag', {
    label: 'Bolt Band (flag)',
    category: 'Bolt Components',
    content: `
    <bolt-band tag="div" size="small" theme="dark" full-bleed>
    <div class="c-bolt-band c-bolt-band--small t-bolt-dark c-bolt-band--full-bleed">
      <div class="c-bolt-band__content">
        <bolt-wrapper size="xxlarge" full="true" bolt-object>
          <div class="o-bolt-wrapper o-bolt-wrapper--xxlarge o-bolt-wrapper--full">
            <div class="o-bolt-grid o-bolt-grid--flex o-bolt-grid--middle o-bolt-grid--matrix">
              <div class="o-bolt-grid__cell u-bolt-width-12/12@only-small u-bolt-flex-grow">
                <p class="c-bolt-eyebrow c-bolt-eyebrow--regular">This Is a Flag</p>
                <h2 class="c-bolt-headline c-bolt-headline--bold c-bolt-headline--large">With text on the left and CTAs on
                  the right.</h2>
              </div>
              <div class="o-bolt-grid__cell u-bolt-width-12/12@only-small">
                <bolt-list tag="ul" display="inline" spacing="xsmall" separator="none" align="start" valign="center">
                  <replace-with-grandchildren>
                    <ul
                      class="c-bolt-list c-bolt-list--display-inline c-bolt-list--spacing-xsmall c-bolt-list--align-start c-bolt-list--valign-center">
                      <bolt-list-item>
                        <replace-with-grandchildren>
                          <li
                            class="c-bolt-list-item c-bolt-list-item--display-inline c-bolt-list-item--spacing-xsmall c-bolt-list-item--align-start">
                            <bolt-button size="small" color="primary" width="auto" border-radius="regular" align="center"
                              transform="none">
                              <button
                                class="c-bolt-button c-bolt-button--small c-bolt-button--primary c-bolt-button--border-radius-regular c-bolt-button--center"
                                is="shadow-root">
                                <replace-with-children class="c-bolt-button__icon is-empty"></replace-with-children>
                                <replace-with-children class="c-bolt-button__item">Primary action</replace-with-children>
                                <replace-with-children class="c-bolt-button__icon is-empty"></replace-with-children>
                              </button>
                            </bolt-button>
                          </li>
                        </replace-with-grandchildren>
                      </bolt-list-item>
                      <bolt-list-item last>
                        <replace-with-grandchildren>
                          <li
                            class="c-bolt-list-item c-bolt-list-item--display-inline c-bolt-list-item--spacing-xsmall c-bolt-list-item--align-start c-bolt-list-item--last-item">
                            <bolt-button size="small" color="secondary" width="auto" border-radius="regular"
                              align="center" transform="none">
                              <button
                                class="c-bolt-button c-bolt-button--small c-bolt-button--secondary c-bolt-button--border-radius-regular c-bolt-button--center"
                                is="shadow-root">
                                <replace-with-children class="c-bolt-button__icon is-empty"></replace-with-children>
                                <replace-with-children class="c-bolt-button__item">Secondary action
                                </replace-with-children>
                                <replace-with-children class="c-bolt-button__icon is-empty"></replace-with-children>
                              </button>
                            </bolt-button>
                          </li>
                        </replace-with-grandchildren>
                      </bolt-list-item>
                    </ul>
                  </replace-with-grandchildren>
                </bolt-list>
              </div>
            </div>
          </div>
        </bolt-wrapper>
      </div>
    </div>
  </bolt-band>
    `,
  });
}
