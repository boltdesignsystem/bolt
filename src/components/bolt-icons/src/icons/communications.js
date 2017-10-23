// import { Preact, h } from 'preact';
const Communications = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" {...otherProps}>
      <title>Icon/Industry/Communications</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path d="M16 1C7.178 1 0 8.178 0 17c0 6.634 3.988 12.482 10.161 14.9l.729-1.862C5.489 27.922 2 22.805 2 17 2 9.28 8.28 3 16 3s14 6.28 14 14c0 5.802-3.485 10.916-8.88 13.028l.729 1.862C28.016 29.476 32 23.631 32 17c0-8.822-7.178-16-16-16" />
        <path d="M26.375 17c0-5.721-4.654-10.375-10.375-10.375S5.625 11.279 5.625 17c0 4.26 2.669 8.15 6.641 9.68l.718-1.867C9.778 23.579 7.625 20.439 7.625 17c0-4.618 3.757-8.375 8.375-8.375s8.375 3.757 8.375 8.375c0 3.442-2.153 6.582-5.358 7.813l.716 1.867c3.973-1.525 6.642-5.415 6.642-9.68" />
        <path d="M16.005 14.036a3 3 0 1 0 0 6 3 3 0 0 0 0-6" />
      </g>
    </svg>
  );
};
export default Communications;
