// import { Preact, h } from 'preact';
const Warning = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Warning</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path
          d="M0,64a64,64 0 1,0 128,0a64,64 0 1,0 -128,0"
          class="c-bolt-icon--background c-bolt-icon--circle-background"
        />
        <g fill="currentColor">
          <path d="M20.869 19.976H3.13a1.046 1.046 0 0 1-.891-1.566L11.11 3.6l.006-.006c.197-.308.524-.492.89-.492.367 0 .702.19.898.505l8.856 14.797c.09.157.137.34.137.524a1.043 1.043 0 0 1-1.028 1.048zm2.698-2.634l-.007-.006-8.87-14.817c0-.006-.006-.006-.006-.013A3.137 3.137 0 0 0 11.999 1a3.127 3.127 0 0 0-2.691 1.526L.432 17.343s0 .007-.006.007A3.15 3.15 0 0 0 0 18.928a3.154 3.154 0 0 0 3.106 3.144h17.783a3.155 3.155 0 0 0 3.11-3.144c0-.556-.15-1.107-.43-1.585l-.002-.001z" />
          <path d="M12 7.4c-.578 0-1.049.471-1.049 1.047v4.192c0 .577.471 1.05 1.048 1.05.576 0 1.048-.473 1.048-1.05V8.447c0-.576-.472-1.048-1.048-1.048M12 15.784a1.049 1.049 0 0 0 0 2.095 1.05 1.05 0 0 0 1.047-1.048A1.049 1.049 0 0 0 12 15.784" />
        </g>
      </g>
    </svg>
  );
};
export default Warning;
