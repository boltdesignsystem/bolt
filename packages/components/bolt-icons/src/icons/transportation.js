const Transportation = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} {...otherProps}>
      <path
        d="M12 5.999h8V3.998h-8v2.001zm16 2H4v-5a1 1 0 0 1 1-1h22a1 1 0 0 1 1 1v5zm0 10.999v1.001H4v-10h24v8.999zm-2 7A1.999 1.999 0 1 1 28 24a1.998 1.998 0 0 1-2 1.998zm-3.446 0H9.446A3.96 3.96 0 0 0 10 24c0-.732-.211-1.41-.555-2.001h13.11A3.962 3.962 0 0 0 22 24c0 .731.211 1.408.554 1.998zM6 25.998A1.999 1.999 0 1 1 8 24a1.998 1.998 0 0 1-2 1.998zM28 0H4a2 2 0 0 0-2 1.999V24c0 1.477.81 2.752 2 3.445v3.553a1 1 0 1 0 2 0V28h20v2.998a1 1 0 1 0 2 0v-3.553c1.191-.693 2-1.968 2-3.445V1.999A2 2 0 0 0 28 0z"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </svg>
  );
};
export default Transportation;
