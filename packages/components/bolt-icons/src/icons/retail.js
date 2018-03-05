const Retail = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" {...otherProps}>
      <path
        d="M29 29a1 1 0 0 1-1 1H17V11.427L23 14a2 2 0 0 0 2-2V7h3a1 1 0 0 1 1 1v21zM23 4.35v6.65a1 1 0 0 1-1 1l-4.433-2.218L23 4.351zM9.612 2.256c-.039-.039-.089-.058-.133-.089A.97.97 0 0 1 10 2h12c.2 0 .375.073.531.174-.057.036-.119.062-.169.112l-6.36 6.36-6.39-6.39zM15 30H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3v5a2 2 0 0 0 2 2l6-2.57V30zM9 4.354l5.43 5.431L10 12a1 1 0 0 1-1-1V4.354zM29 5h-4V2a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v3H3a2 2 0 0 0-2 2v23a2 2 0 0 0 2 2h26a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zM19 20h8v-2h-8v2z"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </svg>
  );
};
export default Retail;
