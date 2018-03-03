const More = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <g fill="currentColor" fill-rule="evenodd">
        <path
          d="M0,64a64,64 0 1,0 128,0a64,64 0 1,0 -128,0"
          class="c-bolt-icon--background c-bolt-icon--circle-background"
          fill="none"
        />
        <g fill="currentColor">
          <path d="M14.07 12a2 2 0 1 1-4.002-.001 2 2 0 0 1 4.001.001M6 12A2 2 0 1 1 2 11.999 2 2 0 0 1 6 12M22.139 12a2 2 0 1 1-4.002-.001A2 2 0 0 1 22.14 12" />
        </g>
      </g>
    </svg>
  );
};
export default More;
