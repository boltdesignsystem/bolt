const Healthcare = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" {...otherProps}>
      <title>Icon/Industry/Healthcare</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path d="M29 27a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h22a2 2 0 0 1 2 2v18zM11 5h10V3H11v2zm16 0h-4V1H9v4H5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h22a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z" />
        <path d="M16 11c-1.653 0-3 1.346-3 3v1h-1a3.003 3.003 0 0 0-3 3 3.003 3.003 0 0 0 3 3h1v1c0 1.654 1.346 3 3 3a3.005 3.005 0 0 0 3-3v-1h1c1.655 0 3-1.347 3-3 0-1.654-1.345-3-3-3h-1v-1c0-1.654-1.345-3-3-3m0 2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 1 1 0 2h-2a.999.999 0 0 0-1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 0-1-1h-2a.999.999 0 1 1 0-2h2a1 1 0 0 0 1-1v-2c0-.553.448-1 1-1" />
      </g>
    </svg>
  );
};
export default Healthcare;
