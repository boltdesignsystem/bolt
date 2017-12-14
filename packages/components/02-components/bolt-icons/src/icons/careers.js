// import { Preact, h } from 'preact';
const Careers = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" {...otherProps}>
      <title>Icon/How/Careers</title>
      <path
        d="M28 29H4a2 2 0 0 1-2-1.999v-12h28v12A2 2 0 0 1 28 29zM4 7.001h24A2 2 0 0 1 30 9v4H2V9a2 2 0 0 1 2-1.999zm8-3A1 1 0 0 1 13 3h6a1 1 0 0 1 1 1.001V5h-8v-.999zM28 5h-6V2a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v3H4a4 4 0 0 0-4 4v18.001a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </svg>
  );
};
export default Careers;
