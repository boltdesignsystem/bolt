// import { Preact, h } from 'preact';
const ExitFullScreen = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Exit Full Screen</title>
      <defs>
        <path id="a" d="M9.987 8.98V0H.992v8.978h8.995z" />
        <path id="c" d="M0 9h8.996V0H0z" />
      </defs>
      <g fill="currentColor" fill-rule="evenodd">
        <path
          d="M0,64a64,64 0 1,0 128,0a64,64 0 1,0 -128,0"
          class="c-bolt-icon--background c-bolt-icon--circle-background"
          fill="none"
        />
        <g transform="translate(12 3)">
          <mask id="b" fill="currentColor">
            <use xlinkHref="#a" />
          </mask>
          <path
            d="M9.7.291a1.003 1.003 0 0 0-1.414 0L2.992 5.585V1.997c0-.55-.45-1-1-1s-1 .45-1 1v6.066a.926.926 0 0 0 .07.3V8.376s0 .006.005.006c.037.094.094.175.156.256l.006.006.006.005.006.006v.006c.025.026.044.051.07.07h.005l.006.005s.006 0 .006.006h.006l.006.007a.875.875 0 0 0 .25.155H1.608c.1.044.213.07.325.075h6.042c.55 0 1-.45 1-1 0-.549-.45-1-1-1H4.387l5.294-5.293a.968.968 0 0 0 .012-1.4L9.7.29z"
            fill="currentColor"
            mask="url(#b)"
          />
        </g>
        <g transform="translate(2 14)">
          <mask id="d" fill="currentColor">
            <use xlinkHref="#c" />
          </mask>
          <path
            d="M8.918.609s0-.006-.006-.006V.59a1.016 1.016 0 0 0-.15-.244L8.756.34 8.75.336 8.744.33 8.738.323C8.713.298 8.694.273 8.67.255L8.663.249 8.657.242 8.651.236 8.645.23 8.64.224a1.222 1.222 0 0 0-.213-.137h-.012A.977.977 0 0 0 8.008 0H1.996c-.55 0-1 .449-1 1 0 .549.45 1 1 1h3.588L.29 7.294a1.005 1.005 0 0 0 0 1.413C.484 8.9.74 9 .996 9c.256 0 .513-.101.706-.294l5.294-5.294V7c0 .549.45 1 1 1s1-.451 1-1V1a.99.99 0 0 0-.075-.388L8.918.609z"
            fill="currentColor"
            mask="url(#d)"
          />
        </g>
      </g>
    </svg>
  );
};
export default ExitFullScreen;
