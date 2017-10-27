// import { Preact, h } from 'preact';
const Mobility = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" {...otherProps}>
      <title>Icon/product/Platform/Mobility</title>
      <path
        d="M16 24a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm8 3.999A2 2 0 0 1 22 30H10a2 2 0 0 1-2-2.001v-24a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v24zM22 0H10a4 4 0 0 0-4 4v23.999A4.001 4.001 0 0 0 10 32h12a4 4 0 0 0 4-4.001v-24A4 4 0 0 0 22 0z"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </svg>
  );
};
export default Mobility;
