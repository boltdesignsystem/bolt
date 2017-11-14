// import { Preact, h } from 'preact';
const CaseManagement = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" {...otherProps}>
      <title>Icon/product/Platform/Case-Management</title>
      <path
        d="M30 27a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v18zM12 4.002C12 3.448 12.448 3 13 3h6c.552 0 1 .448 1 1.001V5h-8V4zM28 5h-6V2a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v3H4a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </svg>
  );
};
export default CaseManagement;
