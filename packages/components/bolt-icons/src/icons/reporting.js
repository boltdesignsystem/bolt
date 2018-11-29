
  import { h } from '@bolt/core/renderers';

  export const Reporting = ({ bgColor, fgColor, size, ...otherProps }) => {
      return (
        <svg data-name="Layer 1" {...otherProps} viewBox="0 0 26 32"><path fill={bgColor} fill-rule="evenodd" d="M17.9.4l3.4 4.2a1 1 0 0 1-.2 1.4 1.42 1.42 0 0 1-.6.2.91.91 0 0 1-.8-.4l-1.8-2.3A17.12 17.12 0 0 1 1 18.2a1 1 0 0 1 0-2A15.18 15.18 0 0 0 16 3.3l-2.4 1.9a1 1 0 0 1-1.2-1.6L16.6.2a.1.1 0 0 0 .1-.1c.1 0 .1-.1.2-.1h.5c.1 0 .1 0 .2.1a.1.1 0 0 1 .1.1.22.22 0 0 1 .2.2zM1 24.3a.94.94 0 0 1 1 1V31a.94.94 0 0 1-1 1 .94.94 0 0 1-1-1v-5.7a1 1 0 0 1 1-1zm8-4.8a.94.94 0 0 1 1 1V31a1 1 0 0 1-2 0V20.5a.94.94 0 0 1 1-1zm8-3.5a.94.94 0 0 1 1 1v14a1 1 0 0 1-2 0V17a.94.94 0 0 1 1-1zm8-5.2a.94.94 0 0 1 1 1V31a1 1 0 0 1-2 0V11.8a1 1 0 0 1 1-1z" data-name="path-1"/></svg>
      )
};
