const CoBrowse = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} {...otherProps}>
      <path
        d="M30 12H8v-2a2 2 0 0 1 2-1.999h18A2 2 0 0 1 30 10v2zm0 16a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V14h22v14zM28 6H10a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h18a4 4 0 0 0 4-4V10a4 4 0 0 0-4-4zM4 2.001h18A2 2 0 0 1 24 4h2a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4v-2a2 2 0 0 1-2-2V8h2V6H2V4a2 2 0 0 1 2-1.999z"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </svg>
  );
};
export default CoBrowse;
