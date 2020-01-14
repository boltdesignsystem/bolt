import * as grapesjs from 'grapesjs'; // eslint-disable-line no-unused-vars
// @ts-ignore
import buttonSchema from '@bolt/components-button/button.schema';
// @ts-ignore
import textSchema from '@bolt/components-text/text.schema.yml';
import iconSchema from '@bolt/components-icon/icon.schema.json';
import listSchema from '@bolt/components-list/list.schema.yml';
import characterSchema from '@bolt/micro-journeys/src/character.schema';
import connectionSchema from '@bolt/micro-journeys/src/connection.schema';
import pathwaysSchema from '@bolt/micro-journeys/src/interactive-pathways.schema';
import statusDialogueBarSchema from '@bolt/micro-journeys/src/status-dialogue-bar.schema';
import svgAnimationsSchema from '@bolt/micro-journeys/src/bolt-svg-animations/svg-animations.schema';
// @ts-ignore
import blockquoteSchema from '@bolt/components-blockquote/blockquote.schema.yml';
// @ts-ignore
import chipSchema from '@bolt/components-chip/chip.schema.yml';
// @ts-ignore
import imageSchema from '@bolt/components-image/image.schema.yml';
import animateSchema from '@bolt/components-animate/animate.schema';
import * as starters from '@bolt/micro-journeys/starters';
// @ts-ignore
import linkSchema from '@bolt/components-link/link.schema.yml';
// import { animationNames } from '@bolt/components-animate/animation-meta';
import { isChildOfEl, convertSchemaPropToTrait, getStepsLorem } from './utils';

class EditorRegisterBoltError extends Error {}

const smallButton = {
  id: 'bolt-button--small',
  title: 'Button',
  content: `<bolt-button size="small">Button</bolt-button>`,
};

const basicText = {
  id: 'bolt-text',
  title: 'Text',
  content: `<bolt-text font-size="xsmall">Hello!</bolt-text>`,
};

const statusBar = {
  id: 'bolt-status-dialogue-bar',
  title: 'Dialogue Bar',
  content: `
    <bolt-status-dialogue-bar icon-name="cloud">
      <p slot="text"> I'm a large character </p>
    </bolt-status-dialogue-bar>
    `,
};

const statusBarAlert = {
  id: 'bolt-status-dialogue-bar--alert',
  title: 'Dialogue Bar: alert',
  content: `
    <bolt-status-dialogue-bar dialogue-arrow-direction="none" is-alert-message icon-name="exclamation">
      <p slot="text"> Uh oh! </p>
    </bolt-status-dialogue-bar>
  `,
};

const cta = {
  id: 'bolt-cta',
  title: 'CTA',
  content: `
      <bolt-cta>
        <bolt-icon size="medium" slot="icon" name="asset-presentation"></bolt-icon>
        <bolt-link slot="link" display="inline">
          CTA Text
          <bolt-icon name="chevron-right"></bolt-icon>
        </bolt-link>
      </bolt-cta>
      `,
};

const icon = {
  id: 'bolt-icon',
  title: 'Icon',
  content: `<bolt-icon size="xlarge" name="customer-onboarding" background="circle" color="blue"></bolt-icon>`,
};

const link = {
  id: 'bolt-link',
  title: 'Link',
  content: `<bolt-link display="inline" valign="start">I'm a link</bolt-link>`,
};

const iconGroupVertical = {
  id: 'bolt-icon-group-vertical',
  title: 'Icon Group (vertical)',
  content: `
<bolt-list display="block" spacing="small">
  <bolt-list-item>
    <bolt-icon name="mobility" size="large"></bolt-icon>
  </bolt-list-item>
  <bolt-list-item>
    <bolt-icon name="documentation" size="large"></bolt-icon>
  </bolt-list-item>
  <bolt-list-item last="">
    <bolt-icon name="print" size="large"></bolt-icon>
  </bolt-list-item>
</bolt-list>
  `,
};

const iconGroupHorizontal = {
  id: 'bolt-icon-group-horizontal',
  title: 'Icon Group (horizontal)',
  content: `
<bolt-list display="inline" spacing="small">
  <bolt-list-item>
    <bolt-icon name="mobility" size="large"></bolt-icon>
  </bolt-list-item>
  <bolt-list-item>
    <bolt-icon name="documentation" size="large"></bolt-icon>
  </bolt-list-item>
  <bolt-list-item last="">
    <bolt-icon name="print" size="large"></bolt-icon>
  </bolt-list-item>
</bolt-list>
  `,
};

const svgAnimations = {
  id: 'bolt-svg-animations',
  title: 'Svg Animations',
  content: `<bolt-svg-animations anim-type="orbit"></bolt-svg-animations>`,
};

const basicSlottableComponents = [
  statusBar,
  statusBarAlert,
  icon,
  smallButton,
  basicText,
  cta,
  link,
  iconGroupVertical,
  iconGroupHorizontal,
];

const characterSlottableComponents = [];
const ctaTextSlottableComponents = [];

Object.keys(starters).map(id => {
  const content = starters[id];
  const component = {
    id,
    title: id,
    content,
  };
  if (id.startsWith('cta')) {
    ctaTextSlottableComponents.push(component);
  }
  if (id.includes('Character')) {
    characterSlottableComponents.push(component);
  }
});

/**
 * @param {grapesjs.Editor} editor
 * @returns {void}
 */
export function setupBolt(editor) {
  const {
    /** @type {grapesjs.DomComponents} */
    DomComponents,
    /** @type {grapesjs.BlockManager} */
    BlockManager,
  } = editor;

  DomComponents.addType('div', {
    isComponent: el => el.tagName === 'DIV',
    model: {
      defaults: {
        tagName: 'div',
        type: 'div',
        draggable: false,
        droppable: false,
        traits: [],
      },
    },
  });

  /**
   * @typedef SlotControl
   * @prop {string} slotName
   * @prop {{ id: string, title: string, content: string}[]} components
   */

  /**
   * @typedef removalEventsToFireOnParents
   * @prop {string} parentSelector
   * @prop {function} eventFactory
   */

  /**
   * @param {Object} opt
   * @param {string} opt.name i.e. `bolt-button`
   * @param {string} [opt.blockTitle] only used if `registerBlock` is `true`
   * @param {import('./utils').JsonSchema} [opt.schema]
   * @param {string[]} [opt.initialContent] HTML for when block is added
   * @param {string} [opt.extend='text'] name of GrapesJS Component to extend
   * @param {string} [opt.category='Bolt Components']
   * @param {boolean | string} [opt.draggable=true] Indicates if it's possible to drag the component inside others. Can use CSS selectors
   * @param {boolean} [opt.editable=true] Allow to edit the content of the component (used on Text components).
   * @param {boolean} [opt.highlightable=true]
   * @param {boolean} [opt.badgable=true] Set to false if you don't want to see the badge (with the name) over the component. Default: `true`
   * @param {boolean} [opt.layerable=true] Set to `false` if you need to hide the component inside Layers. Default: `true`
   * @param {boolean} [opt.selectable=true] Allow component to be selected when clicked. Default: `true`
   * @param {boolean} [opt.registerBlock=true] Register as a GrapesJS Block in addition to Component? If so, allows the user to add it from menu.
   * @param {string[]} [opt.propsToTraits=[]] Json Schema properties keys to auto-add to traits via `convertSchemaPropToTrait`
   * @param {grapesjs.GrapeTrait[]} [opt.extraTraits=[]] Full Trait objects that need more custom attention than `propsToTraits`
   * @param {(el: HTMLElement) => boolean} [opt.isComponent] - function to determine if an HTMLElement is this component. Defaults to seeing if tag name is component name
   * @param {Object.<string, boolean|string>} [opt.slots={ default: true }] - Which slots are available and what can go in them. For example `{ default: true, top: 'bolt-text, bolt-button' }` would let any element be placed as a direct child (the `default` slot) and the `top` slot would only accept `<bolt-text>` or `<bolt-button>`. Those values are passed right to Grape JS's `droppable`.
   * @param {SlotControl[]} [opt.slotControls]
   * @param {removalEventsToFireOnParents[]} [opt.removalEventsToFireOnParents=[]]
   * @returns {{ component: Object, block: Object }} instances from registering @todo fill out types
   * @see {convertSchemaPropToTrait}
   */
  function registerBoltComponent({
    name,
    blockTitle,
    extend = 'text',
    schema = { properties: {} },
    initialContent = [],
    category = 'Components',
    draggable = true,
    editable = false,
    highlightable = false,
    registerBlock = false,
    badgable = true,
    layerable = true,
    selectable = true,
    propsToTraits = [],
    extraTraits = [],
    isComponent,
    slots = { default: false },
    slotControls,
    removalEventsToFireOnParents = [],
  }) {
    const { title, description, properties } = schema;

    const traitsFromProps = propsToTraits.map(propName => {
      const prop = properties[propName];

      if (!prop) {
        throw new EditorRegisterBoltError(
          `Prop "${propName} does not exist on schema for "${name}"`,
        );
      }

      return convertSchemaPropToTrait({ prop, name: propName });
    });

    // Registering slots as Components so we can declare them as dropzones
    Object.keys(slots).forEach(slotName => {
      if (slotName === 'default') return;
      const droppable = slots[slotName];
      const slotComponentName = `${name}__slot--${slotName}`;
      // These are the components that can be slots, we use `null` to indicate that any HTML element with a `slot` attribute
      const extendableComponents = [null, 'bolt-animate'];

      extendableComponents.forEach(extendableComponent => {
        const slotId = extendableComponent
          ? `${slotComponentName}--${extendableComponent}`
          : slotComponentName;

        DomComponents.addType(slotId, {
          extend: extendableComponent,
          isComponent: el => {
            if (!el.getAttribute) return false;
            const assignedSlot = el.getAttribute('slot');
            if (!isChildOfEl(el, name)) return false;
            if (assignedSlot === slotName) {
              if (extendableComponent) {
                return el.tagName === extendableComponent.toUpperCase();
              }
              return true;
            }
          },
          model: {
            defaults: {
              draggable: false,
              droppable,
              removable: false,
              copyable: false,
              selectable: true,
              editable: true,
              layerable: true,
              hoverable: true,
              badgable: true,
              //traits: [],
              icon: `<bolt-icon name="download" title="Slot Dropzone"></bolt-icon>`,
            },
          },
        });
      });
    });

    const componentConfig = {
      isComponent: isComponent
        ? isComponent
        : el => el.tagName === name.toUpperCase(),
      extend,
      model: {
        defaults: {
          type: name,
          tagName: name,
          draggable,
          droppable: slots.default,
          editable,
          highlightable,
          badgable,
          selectable,
          layerable,
          traits: [...traitsFromProps, ...extraTraits],
        },
        getSlotControls() {
          return slotControls;
        },
      },
    };

    if (removalEventsToFireOnParents.length) {
      componentConfig.model.removed = function() {
        removalEventsToFireOnParents.forEach(eventConfig => {
          // this.closest(whatever) is always 0 so we use this.parent().closest(). Meaning immediate ancestors won't work.
          const parent = this.parent().closest(eventConfig.parentSelector);
          // parent is only found and dispatched once, because (my guess is that) nodes are removed from parent -> down.
          if (parent) {
            parent.view.el.dispatchEvent(eventConfig.eventFactory());
          }
        });
      };
    }

    const component = DomComponents.addType(name, componentConfig);

    if (registerBlock) {
      const block = BlockManager.add(name, {
        label: `<span title="${description}">${blockTitle || name}</span>`,
        category,
        select: true,
        content: {
          type: name,
          components: initialContent,
        },
      });

      return {
        component,
        block,
      };
    }

    return {
      component,
      block: null,
    };
  }

  // schema has it as `style` but web component uses it as `color` since `style` is a reserved HTML attribute; see http://vjira2:8080/browse/BDS-721 & http://vjira2:8080/browse/BDS-1104
  const colorTrait = convertSchemaPropToTrait({
    prop: buttonSchema.properties.style,
    name: 'color',
  });
  colorTrait.label = 'Color';

  registerBoltComponent({
    name: 'bolt-button',
    registerBlock: true,
    schema: buttonSchema,
    extend: 'text',
    initialContent: ['<span>Button</span>'],
    propsToTraits: ['size', 'width', 'border_radius'],
    extraTraits: [
      colorTrait,
      {
        label: 'On Click',
        name: 'on-click',
        type: 'select',
        options: ['none', 'show'],
        default: 'none',
      },
      {
        label: 'On Click Target',
        name: 'on-click-target',
        type: 'string',
      },
      {
        label: 'Url',
        name: 'url',
        type: 'string',
      },
      {
        label: 'Disabled',
        name: 'disabled',
        type: 'checkbox',
        default: false,
      },
    ],
  });

  registerBoltComponent({
    name: 'bolt-text',
    registerBlock: true,
    schema: textSchema,
    extend: 'text',
    editable: true,
    highlightable: true,
    initialContent: ['Some Text'],
    propsToTraits: [
      'align',
      'color',
      'display',
      'eyebrow',
      'font-family',
      'font-size',
      'font-style',
      'font-weight',
      'headline',
      'letter-spacing',
      'line-height',
      'quoted',
      'subheadline',
      'tag',
      'text-transform',
    ],
  });

  registerBoltComponent({
    name: 'bolt-list',
    registerBlock: true,
    schema: listSchema,
    editable: true,
    highlightable: true,
    initialContent: ['<bolt-list-item><bolt-text>Item 1<bolt-text></bolt-list-item>'],
    propsToTraits: [
      'tag',
      'display',
      'spacing',
      'separator',
      'inset',
      'align',
      'valign',
      'nowrap',
    ],
  });

  registerBoltComponent({
    name: 'bolt-icon',
    registerBlock: true,
    schema: iconSchema,
    // draggable: '[slot]',
    initialContent: [`<span></span>`],
    propsToTraits: ['size', 'name', 'background', 'color'],
  });

  registerBoltComponent({
    name: 'bolt-blockquote',
    registerBlock: true,
    schema: blockquoteSchema,
    initialContent: [
      `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`,
    ],
    slots: {
      default: true,
      logo: true,
    },
    propsToTraits: ['size', 'alignItems', 'border', 'indent', 'fullBleed'],
    extraTraits: [
      convertSchemaPropToTrait({
        name: 'author-name',
        prop: blockquoteSchema.properties.author.properties.name,
      }),
      convertSchemaPropToTrait({
        name: 'author-title',
        prop: blockquoteSchema.properties.author.properties.title,
      }),
    ],
  });

  registerBoltComponent({
    name: 'bolt-chip',
    schema: chipSchema,
    initialContent: [`<span>Placeholder</span>`],
    propsToTraits: ['url'],
  });

  registerBoltComponent({
    name: 'bolt-image',
    schema: imageSchema,
    initialContent: [`<span>Placeholder</span>`], // @todo set
    propsToTraits: ['src', 'alt', 'no_lazy', 'cover'],
    extraTraits: [
      {
        name: 'ratio',
        label: 'Ratio',
        type: 'text',
        default: '4/3',
      },
    ],
  });

  registerBoltComponent({
    name: 'bolt-interactive-step',
    draggable: false,
    editable: true,
    highlightable: false,
    extraTraits: ['tab-title'],
    removalEventsToFireOnParents: [
      {
        parentSelector: 'bolt-interactive-pathway',
        eventFactory: () => {
          return new CustomEvent('bolt-interactive-step:title-updated', {
            bubbles: true,
          });
        },
      },
    ],
    slots: {
      top: true,
      bottom: true,
    },
    slotControls: [
      {
        slotName: 'top',
        components: characterSlottableComponents,
      },
      {
        slotName: 'bottom',
        components: ctaTextSlottableComponents,
      },
    ],
  });

  BlockManager.add('One-Character Pathway', {
    label: `<span title="">One-Character Pathway</span>`,
    category: 'Starters',
    select: true,
    content: `<bolt-interactive-pathways>
      <bolt-text subheadline font-size="xxlarge" slot="interactive-pathways-lead-text">How Pega technology resolves</bolt-text>
      <bolt-interactive-pathway pathway-title="Billing Inquiries">
        ${getStepsLorem(starters.stepOneCharacterStarter, 6)}
      </bolt-interactive-pathway>
    </bolt-interactive-pathways>`,
  });

  BlockManager.add('Two-Character Pathway', {
    label: `<span title="">Two-Character Pathway</span>`,
    category: 'Starters',
    select: true,
    content: `<bolt-interactive-pathways>
      <bolt-text subheadline font-size="xxlarge" slot="interactive-pathways-lead-text">How Pega technology resolves</bolt-text>
      <bolt-interactive-pathway pathway-title="Billing Inquiries">
        ${getStepsLorem(starters.stepTwoCharacterStarter, 6)}
      </bolt-interactive-pathway>
    </bolt-interactive-pathways>`,
  });

  BlockManager.add('Multiple Two-Character Pathways', {
    label: `<span title="">Two-character Pathways</span>`,
    category: 'Starters',
    select: true,
    content: `<bolt-interactive-pathways>
      <bolt-text subheadline font-size="xxlarge" slot="interactive-pathways-lead-text">How Pega technology resolves</bolt-text>
      <bolt-interactive-pathway pathway-title="Pathway 1">
        ${getStepsLorem(starters.stepTwoCharacterStarter, 6)}
      </bolt-interactive-pathway>
      <bolt-interactive-pathway pathway-title="Pathway 2">
        ${getStepsLorem(starters.stepTwoCharacterStarter, 6)}
      </bolt-interactive-pathway>
      <bolt-interactive-pathway pathway-title="Pathway 3">
        ${getStepsLorem(starters.stepTwoCharacterStarter, 6)}
      </bolt-interactive-pathway>
      <bolt-interactive-pathway pathway-title="Pathway 4">
        ${getStepsLorem(starters.stepTwoCharacterStarter, 6)}
      </bolt-interactive-pathway>
      <bolt-interactive-pathway pathway-title="Pathway 5">
        ${getStepsLorem(starters.stepTwoCharacterStarter, 6)}
      </bolt-interactive-pathway>
      <bolt-interactive-pathway pathway-title="Pathway 6">
        ${getStepsLorem(starters.stepTwoCharacterStarter, 6)}
      </bolt-interactive-pathway>
    </bolt-interactive-pathways>`,
  });

  registerBoltComponent({
    name: 'bolt-interactive-pathways',
    schema: pathwaysSchema,
    propsToTraits: ['customImageSrc', 'imageAlt', 'theme', 'hidePathwaysImage'],
    draggable: true,
    editable: false,
    highlightable: false,
    registerBlock: false,
    slots: {
      default: 'bolt-interactive-pathway',
    },
    // This way of adding pathways is superseded by the Starters. Thus: `registerBlock: false`.
    // Prior sample content left commented out in case alternate starters are desired in the future.
    initialContent: [
      // `<bolt-text subheadline font-size="xxlarge" slot="interactive-pathways-lead-text">How Pega technology resolves</bolt-text>`,
      // `<bolt-interactive-pathway pathway-title="First Title">
      //   ${starters.stepOneCharacterLorem}
      //   ${starters.stepTwoCharacterLorem}
      // </bolt-interactive-pathway>`,
    ],
    slotControls: [
      {
        slotName: 'default',
        components: [
          {
            id: 'pathways',
            title: 'Pathways',
            content: starters.pathwayLorem,
          },
        ],
      },
    ],
  });

  registerBoltComponent({
    name: 'bolt-interactive-pathway',
    draggable: false,
    editable: false,
    highlightable: true,
    extraTraits: ['pathway-title'],
    removalEventsToFireOnParents: [
      {
        parentSelector: 'bolt-interactive-pathways',
        eventFactory: () => {
          return new CustomEvent('bolt-interactive-pathway:title-updated', {
            bubbles: true,
          });
        },
      },
    ],
    slots: {
      default: 'bolt-interactive-step',
    },
    slotControls: [
      {
        slotName: 'default',
        components: [
          {
            id: 'stepOneCharacterLorem',
            title: 'Step - One-Character Starter',
            content: starters.stepOneCharacterLorem,
          },
          {
            id: 'stepTwoCharacterLorem',
            title: 'Step - Two-Character Starter',
            content: starters.stepTwoCharacterLorem,
          },
        ],
      },
    ],
  });

  registerBoltComponent({
    name: 'bolt-animate',
    schema: animateSchema,
    propsToTraits: Object.keys(animateSchema.properties).filter(
      prop => prop !== 'showMeta',
    ),
    draggable: false,
    editable: true,
    highlightable: true,
    slots: {
      default: true,
    },
  });

  registerBoltComponent({
    name: 'bolt-connection',
    schema: connectionSchema,
    propsToTraits: ['animType', 'direction'],
    draggable: false,
    editable: false,
    highlightable: true,
    slots: {
      top: true,
      bottom: true,
    },
    slotControls: ['top', 'bottom'].map(slotName => ({
      slotName,
      components: basicSlottableComponents,
    })),
  });

  registerBoltComponent({
    name: 'bolt-character',
    schema: characterSchema,
    draggable: false,
    editable: true,
    highlightable: true,
    propsToTraits: [
      'size',
      'characterImage',
      'characterCustomUrl',
      'useIcon',
      'constrainBottomSlot',
      'addBackgroundPadding',
    ],
    slots: {
      default: false,
      top: true,
      left: true,
      right: true,
      bottom: true,
      background: true,
    },
    slotControls: [
      ...['top', 'right', 'bottom', 'left'].map(slotName => ({
        slotName,
        components: basicSlottableComponents,
      })),
      {
        slotName: 'background',
        components: [svgAnimations],
      },
    ],
  });

  registerBoltComponent({
    name: 'bolt-cta',
    registerBlock: true,
    slots: {
      default: true,
    },
    initialContent: [
      `<bolt-icon size="medium" slot="icon" name="asset-presentation"></bolt-icon>`,
      `<bolt-link slot="link" display="inline">
        CTA Text
        <bolt-icon name="chevron-right"></bolt-icon>
      </bolt-link>`,
    ],
    extraTraits: [],
  });

  registerBoltComponent({
    name: 'bolt-link',
    schema: linkSchema,
    editable: true,
    extend: 'link',
    registerBlock: true,
    draggable: true,
    propsToTraits: ['display', 'url', 'isHeadline'],
    slots: {
      default: true,
    },
    initialContent: [`I'm a link`],
    extraTraits: [
      {
        label: 'On Click',
        name: 'on-click',
        type: 'select',
        options: ['none', 'show'],
        default: 'none',
      },
      {
        label: 'On Click Target',
        name: 'on-click-target',
        type: 'string',
      },
    ],
  });

  registerBoltComponent({
    name: 'bolt-status-dialogue-bar',
    schema: statusDialogueBarSchema,
    initialContent: [
      `<bolt-text size="xsmall" slot="text">Insert Text Here</bolt-text>`,
    ],
    draggable: true,
    editable: true,
    highlightable: true,
    propsToTraits: ['iconName', 'isAlertMessage', 'dialogueArrowDirection', 'boxFloatDirection'],
    slots: {
      default: false,
      // @todo consider changing `text` to `default`
      text: true,
    },
  });

  // The bolt-svg-animations component is only used internally by the connection component,
  // and as a background slot for the character component. The following bit of logic removes
  // the connection bands from the schema so that they do not appear as options when editing
  // the svg animations behind a character.
  const svgAnimationsSchemaForCharacter = svgAnimationsSchema;
  svgAnimationsSchemaForCharacter.properties.animType.enum = svgAnimationsSchema.properties.animType.enum.filter(
    item => item !== 'connectionBand' && item !== 'tripleConnectionBand',
  );
  registerBoltComponent({
    name: 'bolt-svg-animations',
    schema: svgAnimationsSchemaForCharacter,
    registerBlock: false,
    propsToTraits: ['animType', 'direction', 'speed', 'theme'],
  });
}
