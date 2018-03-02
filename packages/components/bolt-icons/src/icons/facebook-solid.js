const FacebookSolid = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 28" {...otherProps}>
      <title>facebook-solid</title>
      <path
        d="M19.5 2C21.984 2 24 4.016 24 6.5v15c0 2.484-2.016 4.5-4.5 4.5h-2.938v-9.297h3.109l.469-3.625h-3.578v-2.312c0-1.047.281-1.75 1.797-1.75L20.265 9V5.766c-.328-.047-1.469-.141-2.781-.141-2.766 0-4.672 1.687-4.672 4.781v2.672H9.687v3.625h3.125V26H4.499a4.502 4.502 0 0 1-4.5-4.5v-15c0-2.484 2.016-4.5 4.5-4.5h15z"
        fill="currentColor"
      />
    </svg>
  );
};
export default FacebookSolid;
