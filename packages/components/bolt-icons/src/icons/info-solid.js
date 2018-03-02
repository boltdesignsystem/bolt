const InfoSolid = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Info-solid</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path
          d="M0,64a64,64 0 1,0 128,0a64,64 0 1,0 -128,0"
          class="c-bolt-icon--background c-bolt-icon--circle-background"
          fill="none"
        />
        <circle
          cx="11"
          cy="11"
          r="11"
          fill="currentColor"
          transform="translate(1 1)"
        />
        <path
          d="M12.706 8.706A1.001 1.001 0 0 1 12 9a1.003 1.003 0 0 1-1-1 1.007 1.007 0 0 1 1-1 1.003 1.003 0 0 1 1 1c0 .262-.107.518-.294.706zM13 16c0 .55-.45 1-1 1s-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
export default InfoSolid;
