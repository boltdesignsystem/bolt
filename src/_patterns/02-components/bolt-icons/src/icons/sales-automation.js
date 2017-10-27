// import { Preact, h } from 'preact';
const SalesAutomation = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" {...otherProps}>
      <title>Icon/product/CRM/Sales Automation</title>
      <path
        d="M25 31h6V1h-6v30zm2-2.002h2V3h-2v25.998zM9 31h6V4.999H9V31zm2-2.002h2V7h-2v21.998zM17 31h6V9h-6v22zm2-2.001h2v-18h-2v18zM1 31h6V15H1v16zm2-2.002h2V17H3v12z"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </svg>
  );
};
export default SalesAutomation;
