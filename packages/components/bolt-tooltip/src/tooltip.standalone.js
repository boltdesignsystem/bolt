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
import button from '@bolt/components-button/src/button.scss';

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
  }

  render() {
    const data = this.props;
    const baseClass = 'c-bolt-tooltip';

    const classes = [
      baseClass,
      baseClass+'--action',
      'is-align-center',
      'is-push-down'
    ];

    return (
      <span>
        <style>{styles[0][1]}</style>
        <span className={classes.join(' ')}>
          <tooltip-trigger
            text={data.triggerText}
            type={data.triggerType}
            icon={data.triggerIconName}
            toggle-text={data.triggerToggleText}
            toggle-icon={data.triggerToggleIcon}
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
    toggleText: props.string,
    toggleIcon: props.string
  };

  constructor() {
    super();
  }

  render() {
    const data = this.props;

    return (
      <span>
        {data.type === 'button' &&
          <style>{button[0][1]}</style>
        }
        <span
          className="c-bolt-tooltip__trigger"
          aria-describedby="tooltip-1"
          onClick={() => {
            if (data.type === 'button'){
              // Fixes issue with css transitions within re-rendered components
              this.classList.toggle('is-active');
            }
          }}
        >
          {data.type === 'button' &&
          <button className="c-bolt-button c-bolt-button--rounded c-bolt-button--medium c-bolt-button--secondary c-bolt-button--center">
            <div className="toggle--closed">
            {data.icon &&
              <span className="c-bolt-button__icon">
                <bolt-icon name={data.icon} size="medium" />
              </span>
            }
              {data.text}
            </div>
            <div className="toggle--open">
              {data.toggleIcon &&
                <span className="c-bolt-button__icon">
                  <bolt-icon name={data.toggleIcon} size="medium" />
                </span>
              }
              {data.toggleText}
            </div>
          </button>
          }
          {data.type === 'text' &&
          <span>
            {data.icon &&
              <span className="c-bolt-button__icon">
                <bolt-icon name={data.icon} size="medium" />
              </span>
            }
            {data.text}
          </span>
          }
        </span>
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