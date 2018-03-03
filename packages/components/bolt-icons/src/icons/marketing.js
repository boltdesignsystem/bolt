const Marketing = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" {...otherProps}>
      <path
        d="M29.995 23.001a1 1 0 0 1-1 1l-3-.46V6.465l3-.461a1 1 0 0 1 1 1V23zM3 20.001a1 1 0 0 1-1-1v-7.998a1 1 0 0 1 1-1l20.996-3.23v16.46L3 20.002zm10.998 7.752l-6-1.544v-3.35l6 .856v4.038zM29.995 2.004v2.001L2 8.003a2 2 0 0 0-2 2v9.999a2 2 0 0 0 2 2l3.999.57V27a1 1 0 0 0 1 1c.01 0 .018-.002.027-.003l7.67 1.973c.098.026.197.032.295.03h.007l.015-.002a.96.96 0 0 0 .275-.046l.01-.004a.995.995 0 0 0 .7-.948v-5l13.997 2v2h2V2.004h-2z"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </svg>
  );
};
export default Marketing;
