import { h } from '@bolt/core/renderers';

export const YoutubeSolid = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32 32">
      <path fill="none" d="M0 0h32v32H0z" />
      <path
        fill={bgColor}
        d="M12.9 19.88L21 15.7l-8.1-4.24zM16 5.45c6.31 0 10.5.3 10.5.3a4.26 4.26 0 013 1.28 5.26 5.26 0 011.19 3 39.8 39.8 0 01.3 4.85v2.28A39.8 39.8 0 0130.7 22a5.36 5.36 0 01-1.19 3 4.31 4.31 0 01-3 1.26s-4.19.32-10.5.32c-7.8-.07-10.2-.3-10.2-.3A5.08 5.08 0 012.49 25a5.36 5.36 0 01-1.19-3 39.8 39.8 0 01-.3-4.86v-2.28A39.8 39.8 0 011.3 10a5.26 5.26 0 011.19-3 4.26 4.26 0 013-1.28s4.19-.3 10.5-.3z"
      />
    </svg>
  );
};
