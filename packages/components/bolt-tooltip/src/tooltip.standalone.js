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
import colorUtils from '@bolt/global/styles/07-utilities/_utilities-colors.scss';

@define
export class BoltTooltip extends withPreact(withComponent()) {
  static is = 'bolt-tooltip';

  static props = {
    triggerText: props.string,
    triggerType: props.string,
    triggerTransform: props.string,
    triggerIconName: props.string,
    triggerIconSize: props.string,
    triggerToggleText: props.string,
    triggerToggleIcon: props.string,
    content: props.any,
    noWrap: props.boolean,
    spacing: props.string,
    positionVert: props.string,
    count: props.string, // For use ONLY with share
  };

  constructor(self) {
    self = super(self);
    this.useShadow = false; // @todo: Get this working with shadowDOM + slots
    return self;
  }

  connecting() {
    this.triggerID = `bolt-tooltip-id-${Math.floor(Math.random() * 20)}`;
  }

  render() {
    const data = this.props;
    const baseClass = 'c-bolt-tooltip';
    const vert = data.positionVert ? data.positionVert : 'up';

    const classes = [
      baseClass,
      `is-push-${vert}`,
      'is-align-center',
    ];

    if (data.triggerType === 'button') {
      classes.push(`${baseClass}--action`);
    } else {
      classes.push(`${baseClass}--help`);
    }

    if (data.noWrap) {
      classes.push(`${baseClass}--nowrap`);
    }
    if (data.spacing) {
      classes.push(`${baseClass}--spacing-${data.spacing}`);
    } else {
      classes.push(`${baseClass}--spacing-small`);
    }
    // @todo: Conditionally render slot similar to how HyperHtml is doing it
    return (
      <span>
        {this.useShadow &&
          <style>{styles[0][1]}</style>
        }
        <span className={classes.join(' ')}>
          <tooltip-trigger
            text={data.triggerText}
            trigger={data.triggerType}
            transform={data.triggerTransform}
            icon={data.triggerIconName}
            size={data.triggerIconSize}
            toggle-text={data.triggerToggleText}
            toggle-icon={data.triggerToggleIcon}
            trigger-id={this.triggerID}
          />
          <TooltipContent trigger={data.triggerType} trigger-id={this.triggerID} count={data.count}>
            <span dangerouslySetInnerHTML={{ __html: data.content }} />
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
    trigger: props.string,
    transform: props.string,
    icon: props.string,
    size: props.string,
    toggleText: props.string,
    toggleIcon: props.string,
    triggerId: props.string,
  };

  constructor(self) {
    self = super(self);
    return self;
  }

  render() {
    const baseClass = 'c-bolt-button';

    const data = this.props;
    const size = data.size ? data.size : 'medium';

    const classes = [
      baseClass,
      `${baseClass}--rounded`,
      `${baseClass}--medium`,
      `${baseClass}--secondary`,
      `${baseClass}--center`,
      'u-bolt-color-orange',
    ];

    if (data.transform) {
      classes.push(`${baseClass}--${data.transform}`);
    }

    return (
      <span>
        {data.trigger === 'button' &&
        <span>
          <style>{button[0][1]}</style>
          <style>{colorUtils[0][1]}</style>
        </span>
        }
        <span
          className="c-bolt-tooltip__trigger"
          aria-describedby={data.triggerId}
          onClick={() => {
            if (data.trigger === 'button') {
              // Fixes issue with css transitions within re-rendered components
              this.classList.toggle('is-active');
            }
          }}
        >
          {data.trigger === 'button' &&
          <button className={classes.join(' ')}>
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
          {data.trigger === 'text' &&
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
    `c-bolt-tooltip__content--${props.trigger}`,
  ];
  if (props.count) {
    classes.push(`c-bolt-tooltip__content--count-${props.count}`);
  }
  return (
    <span id={props['trigger-id']} className={classes.join(' ')} role="tooltip" aria-hidden="true">
      <span className="c-bolt-tooltip__content-bubble">
        {props.children}
      </span>
    </span>
  );
};