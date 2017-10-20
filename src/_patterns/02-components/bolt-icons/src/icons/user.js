// import { Preact, h } from 'preact';
const User = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/User</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path d="M0 0h24v24H0z" />
        <path
          d="M19.02 17.61a8.332 8.332 0 0 0-4.29-3.43 4.84 4.84 0 0 0 2.13-4.02A4.867 4.867 0 0 0 12 5.3a4.867 4.867 0 0 0-4.86 4.86 4.84 4.84 0 0 0 2.13 4.02 8.332 8.332 0 0 0-4.29 3.43A8.914 8.914 0 0 1 3 12c0-4.96 4.04-9 9-9s9 4.04 9 9c0 2.12-.74 4.07-1.98 5.61m-9.88-7.45A2.866 2.866 0 0 1 12 7.3a2.859 2.859 0 1 1 0 5.72 2.859 2.859 0 0 1-2.86-2.86M12 21c-2.1 0-4.03-.72-5.56-1.93 1.05-2 3.15-3.36 5.56-3.36 2.41 0 4.51 1.36 5.56 3.36A8.926 8.926 0 0 1 12 21m0-20C5.94 1 1 5.94 1 12c0 2.95 1.17 5.63 3.07 7.6a9.59 9.59 0 0 0 1.72 1.46 10.904 10.904 0 0 0 12.42 0 9.59 9.59 0 0 0 1.72-1.46A10.908 10.908 0 0 0 23 12c0-6.06-4.94-11-11-11"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
export default User;
