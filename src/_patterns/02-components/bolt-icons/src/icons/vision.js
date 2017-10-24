// import { Preact, h } from 'preact';
const Vision = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" {...otherProps}>
      <title>Icon/How/Vision</title>
      <g fill="currentColor" fill-rule="evenodd">
        <circle
          class="c-bolt-icon--background c-bolt-icon--circle-background"
          cx="50%"
          cy="50%"
          r="50%"
        />
        <path
          d="M27.607 5.352l-1.484-1.484-2.968 2.967L24.64 8.32l2.967-2.968zM14.69 31.476h2.098v-4.197h-2.098v4.197zm1.049-8.407a7.331 7.331 0 1 1 0-14.663 7.332 7.332 0 0 1 0 14.663zm0-16.774c-5.215 0-9.443 4.228-9.443 9.443s4.228 9.443 9.443 9.443 9.442-4.228 9.442-9.443-4.227-9.443-9.442-9.443zm11.54 10.492h4.197v-2.099H27.28v2.1zm-4.122 7.855l2.967 2.966 1.484-1.483-2.968-2.968-1.483 1.485zM14.689 4.197h2.098V0h-2.098v4.197zM8.318 6.835L5.35 3.868 3.866 5.352 6.834 8.32l1.484-1.484zm-4.452 19.29l1.485 1.483 2.967-2.966-1.484-1.485-2.968 2.968zM0 16.787h4.197v-2.099H0v2.1z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
export default Vision;
