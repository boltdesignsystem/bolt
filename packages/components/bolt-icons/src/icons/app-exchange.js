import { h } from '@bolt/core/renderers';

export const AppExchange = ({
  bgColor,
  fgColor,
  size,
  title,
  ...otherProps
}) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 31.8 32">
      <title>{title}</title>
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M14.9 2.6v9.9a1 1 0 002 0V2.6l11.7 5.8-12.7 6.4L3.2 8.5zm2 13.9L29.8 10v11.8L20 17a1 1 0 10-.9 1.7l9.5 4.7-11.7 6zm-3.5.8a.88.88 0 00-1.3-.4L2 21.9V10.1l12.9 6.4v12.8L3.2 23.5l9.8-4.9a.88.88 0 00.4-1.3zm18.4-8.8a.37.37 0 00-.1-.3v-.1a.22.22 0 00-.2-.2v-.1c-.1-.1-.2-.1-.2-.2L16.3.1c-.1-.1-.2-.1-.4-.1s-.3 0-.4.1L.5 7.6a.22.22 0 00-.2.2v.1c-.1 0-.2 0-.2.1v.1c0 .1-.1.2-.1.3V24c0 .1.1.1.1.2v.1c.1.1.1.1.2.1l14.9 7.5a2.25 2.25 0 00.7.1c.2 0 .3 0 .4-.1l14.9-7.5c.1 0 .1-.1.2-.1v-.1a.35.35 0 00.1-.2V8.5z"
        data-name="path-1"
      />
    </svg>
  );
};
