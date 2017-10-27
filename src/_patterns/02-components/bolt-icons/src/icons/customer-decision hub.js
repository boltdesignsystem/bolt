// import { Preact, h } from 'preact';
const CustomerDecisionHub = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" {...otherProps}>
      <title>Icon/product/CRM/Customer Decision Hub-gray</title>
      <path
        d="M24 7.999h8V.001h-8v7.998zm-12 0h8V.001h-8v7.998zM14 6h4V1.999h-4V6zM0 7.999h8V.001H0v7.998zM2 6h4V1.999H2V6zm22 13.999h8v-8h-8v8zm2-2h4v-4h-4v4zm-14 2h8v-8h-8v8zm-12 0h8v-8H0v8zM24 32h8v-8.001h-8V32zm2-2.001h4v-4.001h-4v4.001zM12 32h8v-8.001h-8V32zm2-2.001h4v-4.001h-4v4.001zM0 32h8v-8.001H0V32zm2-2.001h4v-4.001H2v4.001z"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </svg>
  );
};
export default CustomerDecisionHub;
