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
    triggerIconSize: props.string,
    triggerToggleText: props.string,
    triggerToggleIcon: props.string,
    triggerId: props.string,
    content: props.any,
    type: props.string,
    noWrap: props.boolean,
    spacing: props.string
  };

  constructor() {
    super();
    this.useShadow = hasNativeShadowDomSupport;
  }

  render() {
    const data = this.props;
    const baseClass = 'c-bolt-tooltip';
    const type = data.type === 'help' ? 'help' : 'action';

    const classes = [
      baseClass,
      baseClass + '--' + type,
      'is-align-center',
      'is-push-down'
    ];

    if (data.noWrap) {
      classes.push(baseClass + '--nowrap');
    }
    if (data.spacing) {
      classes.push(baseClass + '--spacing-' + data.spacing);
    }

    return (
      <span>
        <style>{styles[0][1]}</style>
        <span className={classes.join(' ')}>
          <tooltip-trigger
            text={data.triggerText}
            type={data.triggerType}
            icon={data.triggerIconName}
            size={data.triggerIconSize}
            toggle-text={data.triggerToggleText}
            toggle-icon={data.triggerToggleIcon}
            trigger-id={data.triggerId}
          />
          <TooltipContent type={data.triggerType} trigger-id={data.triggerId}>
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
    size: props.string,
    toggleText: props.string,
    toggleIcon: props.string,
    triggerId: props.string
  };

  constructor() {
    super();
  }

  render() {
    const data = this.props;
    const size = data.size ? data.size : 'medium';

    return (
      <span>
        {data.type === 'button' &&
          <style>{button[0][1]}</style>
        }
        <span
          className="c-bolt-tooltip__trigger"
          aria-describedby={data.triggerId}
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
                <bolt-icon name={data.icon} size={size} />
              </span>
            }
              {data.text}
            </div>
            <div className="toggle--open">
              {data.toggleIcon &&
                <span className="c-bolt-button__icon">
                  <bolt-icon name={data.toggleIcon} size={size} />
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
                <bolt-icon name={data.icon} size={size} />
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
    <span id={props['trigger-id']} className={classes.join(' ')} role="tooltip" aria-hidden="true">
      <span className="c-bolt-tooltip__content-bubble">
        {props.children}
      </span>
    </span>
  );
};