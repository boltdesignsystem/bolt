import { h } from '@bolt/core/renderers';

export const IntelligentVirtualAssistant = ({
  bgColor,
  fgColor,
  size,
  title,
  ...otherProps
}) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 30">
      <title>{title}</title>
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M28.5 13.5a1.56 1.56 0 00-2.6-1.1 1.37 1.37 0 00-.4 1.1v3a1.5 1.5 0 00.4 1.1 1.37 1.37 0 001.1.4 1.5 1.5 0 001.1-.4 1.37 1.37 0 00.4-1.1zM20 27c0-.7-.3-1-1-1h-2c-.7 0-1 .3-1 1s.3 1 1 1h2c.7 0 1-.3 1-1zM6.5 13.5a1.5 1.5 0 00-.4-1.1A1.5 1.5 0 005 12a1.5 1.5 0 00-1.1.4 1.37 1.37 0 00-.4 1.1v3a1.5 1.5 0 00.4 1.1A1.5 1.5 0 005 18a1.5 1.5 0 001.1-.4 1.37 1.37 0 00.4-1.1zm25.2-1.2a.91.91 0 01.3.7v4c0 .7-.3 1-1 1h-.8a3.31 3.31 0 01-2.4 1.9 11.37 11.37 0 01-5.8 7.7 3.2 3.2 0 01-3 2.4h-2a3 3 0 010-6h2a2.79 2.79 0 012.6 1.5 8.88 8.88 0 004.1-5.8 3.05 3.05 0 01-2.2-3.2v-3a3.32 3.32 0 01.7-2.1 3 3 0 011.7-1.2 8.92 8.92 0 00-3.2-5.8A8.94 8.94 0 0016.5 2h-1a9.33 9.33 0 00-6.2 2.3 9.65 9.65 0 00-3.2 5.8 3 3 0 011.7 1.2 3.77 3.77 0 01.7 2.1v3a3.49 3.49 0 01-.8 2.2 3.74 3.74 0 01-2 1.2 2.81 2.81 0 01-2.2-.1A3.32 3.32 0 011.9 18H1c-.7 0-1-.3-1-1v-4c0-.7.3-1 1-1h.9a3.45 3.45 0 012.2-1.9 10.69 10.69 0 013.8-7.2A11.09 11.09 0 0115.5 0h1a11.52 11.52 0 017.7 2.9 11.12 11.12 0 013.8 7.2 3.19 3.19 0 012.2 1.9h.8a1.08 1.08 0 01.7.3z"
        data-name="Page-1"
      />
    </svg>
  );
};
