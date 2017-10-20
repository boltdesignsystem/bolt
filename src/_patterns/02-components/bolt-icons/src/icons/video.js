// import { Preact, h } from 'preact';
const Video = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Video</title>
      <g fill="none" fill-rule="evenodd">
        <path d="M0 0h24v24H0z" />
        <path
          d="M21.914 15.535l-4.467-3.188 4.467-3.189v6.378zm-7.305 2.03c0 .573-.468 1.042-1.043 1.042H3.131a1.046 1.046 0 0 1-1.043-1.043V7.13c0-.573.47-1.043 1.043-1.043h10.435c.575 0 1.043.47 1.043 1.043v10.435zm8.825-11.36a1.044 1.044 0 0 0-1.083.077l-5.656 4.037V7.13A3.13 3.13 0 0 0 13.565 4H3.13A3.132 3.132 0 0 0 0 7.13v10.435a3.132 3.132 0 0 0 3.13 3.13h10.435a3.13 3.13 0 0 0 3.13-3.13v-3.189l5.656 4.037a1.028 1.028 0 0 0 1.082.08c.345-.177.567-.536.567-.927V7.131c0-.39-.215-.75-.567-.926h.001z"
          fill="#1F2555"
        />
      </g>
    </svg>
  );
};
export default Video;
