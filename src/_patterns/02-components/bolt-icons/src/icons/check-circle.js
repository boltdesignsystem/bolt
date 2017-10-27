// import { Preact, h } from 'preact';
const CheckCircle = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Check-circle</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path
          d="M0,64a64,64 0 1,0 128,0a64,64 0 1,0 -128,0"
          class="c-bolt-icon--background c-bolt-icon--circle-background"
        />
        <path
          d="M12 21c-4.962 0-9-4.038-9-9s4.038-9 9-9 9 4.038 9 9-4.038 9-9 9m0-20C5.937 1 1 5.938 1 12s4.938 11 11 11 11-4.938 11-11S18.062 1 12 1"
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
export default CheckCircle;
