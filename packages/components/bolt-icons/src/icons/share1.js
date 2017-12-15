// import { Preact, h } from 'preact';
const Share1 = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Share1</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path
          d="M0,64a64,64 0 1,0 128,0a64,64 0 1,0 -128,0"
          class="c-bolt-icon--background c-bolt-icon--circle-background"
          fill="none"
        />
        <g fill="currentColor">
          <path d="M8.473 6.962l2.537-2.537-.017 13.134a1 1 0 1 0 1.998.001V4.417l2.537 2.537a1.004 1.004 0 0 0 1.414 0 1.006 1.006 0 0 0 0-1.415l-4.243-4.243-.026-.025h-.007l-.008-.01-.004-.004-.004-.004-.005-.004a.932.932 0 0 0-.261-.164l-.004-.004-.005-.004s-.004-.005-.007 0a1.126 1.126 0 0 0-.291-.07H12.049l-.003-.005c-.035 0-.066-.004-.097 0l-.004.004h-.01s-.003.004-.008 0l-.004.004h-.01a.818.818 0 0 0-.29.071l-.004.004-.004.004-.004.005a.943.943 0 0 0-.261.163l-.004.004-.005.005-.004.004-.005.004-.004.004a.65.65 0 0 1-.026.027L7.059 5.548a1.003 1.003 0 0 0 0 1.414 1.003 1.003 0 0 0 1.414 0" />
          <path d="M21 7.06a1 1 0 0 0-1 1v11c0 .55-.448 1-1 1H5c-.552 0-1-.45-1-1v-11a1 1 0 1 0-2 0v11c0 1.653 1.346 3 3 3h14c1.654 0 3-1.347 3-3v-11a1 1 0 0 0-1-1" />
        </g>
      </g>
    </svg>
  );
};
export default Share1;
