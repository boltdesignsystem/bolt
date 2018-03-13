import {
  h,
  render,
  define,
  props,
  withComponent,
  hasNativeShadowDomSupport,
  withPreact,
} from '@bolt/core';

import styles from './tooltip.scss';

@define
export class BoltTooltip extends withPreact(withComponent()) {
  static is = 'bolt-tooltip';

  static props = {
    triggerText: props.string,
    triggerType: props.string,
    triggerIconName: props.string,
    triggerIconPosition: props.string,
    triggerToggleText: props.string,
    triggerToggleIcon: props.string,
    content: props.any
  };

  constructor() {
    super();
    this.useShadow = hasNativeShadowDomSupport;
    this.toggler = this.toggler.bind(this);
  }

  connectedCallback(){
    this.state = {
      toggled: false
    };
  }

  toggler() {
    this.state = {
      toggled: !this.state.toggled
    };
  }

  render() {
    const {toggled} = this.state;
    const data = this.props;
    const baseClass = 'c-bolt-tooltip';

    const classes = [
      baseClass,
      baseClass+'--action',
      'is-align-center',
      'is-push-down',
      toggled === true ? 'is-active' : 'not-active'
    ];

    return (
      <span>
        <style>{styles[0][1]}</style>
        <span className={classes.join(' ')}>
          <tooltip-trigger
            text={data.triggerText}
            type={data.triggerType}
            icon={data.triggerIconName}
            position={data.triggerIconPosition}
            toggle-text={data.triggerToggleText}
            toggle-icon={data.triggerToggleIcon}
            toggled={() =>{
              this.toggler();
            }}
          />
          <TooltipContent type={data.triggerType}>
            <span dangerouslySetInnerHTML={{__html: data.content}} />
          </TooltipContent>
        </span>
      </span>
    );
  }
}

@define
class TooltipTrigger extends withPreact(withComponent()) {
  static is = 'tooltip-trigger';

  static props = {
    text: props.string,
    type: props.string,
    icon: props.string,
    position: props.string,
    toggleText: props.string,
    toggleIcon: props.string,
    toggled: props.any
  };

  constructor() {
    super();
    this.handleToggle = this.handleToggle.bind(this);
  }

  connectedCallback(){
    this.state = {
      text: this.props.text,
      icon: this.props.icon,
    };
  }

  handleToggle() {
    const text = this.props.text,
          toggleText = this.props.toggleText,
          icon = this.props.icon,
          toggleIcon = this.props.toggleIcon;
    this.state = {
      text: this.state.text === text ? toggleText : text,
      icon: this.state.icon === icon ? toggleIcon : icon,
    };
  }

  render() {
    const {text, icon} = this.state;
    const data = this.props;
    return (
      <span
        className="c-bolt-tooltip__trigger"
        aria-describedby="tooltip-1"
        onClick={() => {
          this.handleToggle(); // Handles our local toggling
          data.toggled(); // Bubbles event up to parent to toggle higher level classes
        }}
      >
        {icon} : {text}
  </span>
    );
  }
}

const TooltipContent = (props) => {
  const classes = [
    'c-bolt-tooltip__content',
    'c-bolt-tooltip__content--' + props.type,
  ];
  return (
    <span id="tooltip-1" className={classes.join(' ')} role="tooltip" aria-hidden="true">
      <span className="c-bolt-tooltip__content-bubble">
        {props.children}
      </span>
    </span>
  );
};