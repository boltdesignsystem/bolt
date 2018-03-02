const Hospitality = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} {...otherProps}>
      <path
        d="M2 22l2-7v1h24v-1l2 7H2zm28 6H2v-4h28v4zM6 8h4v1.001A1 1 0 0 0 11 10h10c.553 0 1-.447 1-.999V8h4l1.714 6.001H4.286L6 8zm6 0h8V6.001h-8V8zM6 3.001A1 1 0 0 1 7 2h18a1 1 0 0 1 1 1.001V5a1 1 0 0 1-1 1.001h-3V5a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1.001H7A1 1 0 0 1 6 5V3.001zM31.556 22L28 6.001V2a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4.001L.444 22H0v8h2v2h2v-2h24v2h2v-2h2v-8h-.444z"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </svg>
  );
};
export default Hospitality;
