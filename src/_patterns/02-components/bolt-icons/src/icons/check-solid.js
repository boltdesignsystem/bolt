// import { Preact, h } from 'preact';
const CheckSolid = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Check-solid</title>
      <g fill="none" fill-rule="evenodd">
        <path d="M0 0h24v24H0z" />
        <circle
          cx="11"
          cy="11"
          r="11"
          transform="translate(1 1)"
          fill="#1F2555"
        />
        <path d="M6 6h12v12H6z" />
        <path
          d="M16.05 8.161l-5.718 5.608-2.386-2.275a.558.558 0 0 0-.784 0 .557.557 0 0 0 0 .785l2.777 2.778a.553.553 0 0 0 .784 0l6.11-6.11a.55.55 0 0 0 0-.786.556.556 0 0 0-.783 0z"
          stroke={color}
          fill="#FFF"
        />
      </g>
    </svg>
  );
};
export default CheckSolid;
