// import { Preact, h } from '@bolt/core';
const MapPinSolid = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height="25" viewBox="0 0 24 25" {...otherProps}>
      <title>Untitled 8</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path />
        <path
          d="M12 0c5.512 0 10 4.488 10 10 0 1.763-.519 3.607-1.531 5.463-.788 1.444-1.875 2.906-3.244 4.35-2.3 2.432-4.575 3.956-4.669 4.019a1 1 0 0 1-1.112 0c-.094-.063-2.369-1.588-4.669-4.019-1.363-1.444-2.457-2.906-3.244-4.35C2.513 13.606 2 11.769 2 10 2 4.488 6.488 0 12 0zm0 6c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z"
          fill="currentColor"
          fill-rule="nonzero"
        />
      </g>
    </svg>
  );
};
export default MapPinSolid;
