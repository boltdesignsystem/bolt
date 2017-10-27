// import { Preact, h } from 'preact';
const CaseManagement = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" {...otherProps}>
      <title>Icon/product/Platform/Case-Management</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path d="M0 0v8h2V2h6v2H5v4h2V6.002h21v2h2V4l-20-.001V0H0zm0 10l2 22h28l2-22H0zm2 2h28l-2 18H4L2 12z" />
        <path d="M13.29 26.694a1.009 1.009 0 0 1 0-1.426l9.978-9.977a1.007 1.007 0 1 1 1.426 1.425l-9.978 9.978a1.008 1.008 0 0 1-1.425 0" />
        <path d="M7.293 20.293a.96.96 0 0 1 1.358 0l6.072 5.073a.958.958 0 1 1-1.357 1.357L7.293 21.65a.959.959 0 0 1 0-1.357" />
      </g>
    </svg>
  );
};
export default CaseManagement;
