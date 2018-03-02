const FieldService = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" {...otherProps}>
      <title>Icon/product/CRM/Field Service-gray</title>
      <path
        d="M16 30C8.268 30 2 23.734 2 16 2 8.268 8.268 2 16 2c7.733 0 14 6.268 14 14 0 7.733-6.267 14-14 14zm0-30C7.164 0 0 7.163 0 16c0 8.838 7.164 16 16 16 8.837 0 16.001-7.162 16.001-16 0-8.837-7.164-16-16-16zm0 6C10.477 6 6 10.477 6 16h2a8 8 0 0 1 16 0h2c0-5.523-4.476-10-10-10zm-2 19h2v-2h-2v2zm6.5-10.879a.983.983 0 0 0-1.365.38l-3.649 6.543A2.997 2.997 0 0 0 15 21a3 3 0 1 0 3 3c0-.76-.284-1.451-.75-1.98l3.617-6.485a1.056 1.056 0 0 0-.366-1.415z"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </svg>
  );
};
export default FieldService;
