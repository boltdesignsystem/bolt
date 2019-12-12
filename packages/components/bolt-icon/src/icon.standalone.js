import {
  colorContrast,
  css,
  define,
  props,
  rgb2hex,
  supportsCSSVars,
} from '@bolt/core/utils';
import { spacingSizes } from '@bolt/core/data';
import { withPreact } from '@bolt/core/renderers';
import { h } from 'preact';
import styles from './icon.scss';
import schema from '../icon.schema.json';
import CustomIcon from './icon.jsx';

const svgIcons = require.context('@bolt/components-icons', true, /\.svg$/);

const Icons = svgIcons.keys().reduce((images, path) => {
  const key = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
  images[key] = svgIcons(path).default;
  return images;
}, {});

@define
class BoltIcon extends withPreact() {
  static is = 'bolt-icon';

  static props = {
    name: props.string,
    size: props.string,
    background: props.string,
    color: props.string,
    // programatically spell out the contrast color that needs to get used
    contrastColor: props.string,
  };

  constructor(self) {
    self = super(self);
    this.useShadow = false; // required since we are referencing SVG symbols that are inline on the page
    this.useCssVars = supportsCSSVars;
    return self;
  }

  connecting() {
    this.state = {
      primaryColor:
        'var(--bolt-icon-primary-color, var(--bolt-theme-icon, currentColor))',
      secondaryColor:
        'var(--bolt-icon-secondary-color, rgba(var(--bolt-theme-background), 1))',
    };

    if (!this.useCssVars) {
      this.state.primaryColor = 'currentColor';

      if (this.contrastColor) {
        this.state.secondaryColor = this.contrastColor;
      } else {
        this.state.secondaryColor = colorContrast(
          rgb2hex(window.getComputedStyle(this).getPropertyValue('color')),
        );

        if (this.style.color) {
          this.state.secondaryColor = 'currentColor';
        }
        this.state.secondaryColor === '#000000' ? (this.isOnLight = true) : '';
        this.state.secondaryColor === '#FFFFFF' ? (this.isOnDark = true) : '';
      }
    }
  }

  render() {
    const { size, name, color, background } = this.props;
    const { primaryColor, secondaryColor } = this.state;

    const classes = css(
      'c-bolt-icon',
      size && spacingSizes[size] && spacingSizes[size] !== ''
        ? `c-bolt-icon--${size}`
        : '',
      name ? `c-bolt-icon--${name}` : '',
      background && schema.properties.background.enum.includes(background)
        ? `has-background`
        : '',
      background && schema.properties.background.enum.includes(background)
        ? `has-${background}-background`
        : '',
      color && schema.properties.color.enum.includes(color)
        ? `c-bolt-icon--${color}`
        : '',
    );

    const iconClasses = css(
      'c-bolt-icon__icon',
      size && spacingSizes[size] && spacingSizes[size] !== ''
        ? `c-bolt-icon__icon--${size}`
        : '',
    );

    const backgroundClasses = css(
      'c-bolt-icon__background-shape',
      background && schema.properties.background.enum.includes(background)
        ? `c-bolt-icon__background-shape--${background}`
        : '',
    );

    const DefaultIcon = Icons[`${name}`];

    return (
      <span className={classes}>
        {DefaultIcon ? (
          <DefaultIcon
            className={iconClasses}
            bgColor={primaryColor}
            fgColor={secondaryColor}
          />
        ) : (
          // @ts-ignore
          <CustomIcon
            glyph={name}
            className={iconClasses}
            bgColor={primaryColor}
            fgColor={secondaryColor}
          />
        )}
        {background && <span className={backgroundClasses} />}
      </span>
    );
  }
}

export { BoltIcon };
