// import { Preact, h } from 'preact';
const ArrowLeft = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/arrow-left</title>
      <g fill="currentColor" fill-rule="evenodd">
        <circle class="c-bolt-icon--circle-background" cx="64" cy="64" r="64" />
        <path
          d="M20.917 12.378c.038-.112.063-.212.069-.318v-.105a.951.951 0 0 0-.069-.33 1.084 1.084 0 0 0-.162-.274c-.03-.036-.043-.049-.055-.06l-6-6a1.005 1.005 0 0 0-1.413 0 1.004 1.004 0 0 0 0 1.412l4.294 4.294H4c-.55 0-1 .45-1 1s.45 1 1 1h13.587l-4.294 4.294a1.005 1.005 0 0 0 0 1.413.999.999 0 0 0 1.412 0l5.994-5.994c.019-.025.031-.044.044-.056.087-.107.136-.188.174-.276z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
export default ArrowLeft;
