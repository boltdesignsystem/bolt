const CheckSolid = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} {...otherProps}>
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
          transform="translate(1 1)"
          fill="currentColor"
        />
        <path d="M6 6h12v12H6z" />
        <path
          d="M16.05 8.161l-5.718 5.608-2.386-2.275a.558.558 0 0 0-.784 0 .557.557 0 0 0 0 .785l2.777 2.778a.553.553 0 0 0 .784 0l6.11-6.11a.55.55 0 0 0 0-.786.556.556 0 0 0-.783 0z"
          stroke={color}
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
export default CheckSolid;
