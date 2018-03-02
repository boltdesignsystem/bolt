const Energy = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} {...otherProps}>
      <path
        d="M6.782 15h5.94a1.027 1.027 0 0 1 1.017 1.165l-1.676 12.309L25.27 17.053h-5.94a1.027 1.027 0 0 1-1.017-1.165L19.99 3.58 6.782 15zm3.898 17.053a1.026 1.026 0 0 1-1.016-1.165l1.883-13.835h-7.52a1.027 1.027 0 0 1-.672-1.803l17.347-15a1.027 1.027 0 0 1 1.687.915L20.506 15h7.52a1.027 1.027 0 0 1 .671 1.803l-17.346 15c-.19.165-.429.25-.67.25z"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </svg>
  );
};
export default Energy;
