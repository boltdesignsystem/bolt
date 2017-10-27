// import { Preact, h } from 'preact';
const Download = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Download</title>
      <defs>
        <path id="a" d="M15.998.049v1.95H.001V.05h15.997z" />
      </defs>
      <g fill="currentColor" fill-rule="evenodd">
        <path
          d="M0,64a64,64 0 1,0 128,0a64,64 0 1,0 -128,0"
          class="c-bolt-icon--background c-bolt-icon--circle-background"
        />
        <g transform="translate(4 19.5)">
          <mask id="b" fill="currentColor">
            <use xlinkHref="#a" />
          </mask>
          <path
            d="M15.023.049H.976A.978.978 0 0 0 0 1.025C0 1.56.44 2 .976 2h14.046a.978.978 0 0 0 .976-.975.979.979 0 0 0-.975-.976"
            fill="currentColor"
            mask="url(#b)"
          />
        </g>
        <path
          d="M11.408 17.73a.77.77 0 0 0 .59.27c.23 0 .451-.101.591-.27l5.25-6.283a.652.652 0 0 0 .084-.733.76.76 0 0 0-.675-.393h-2.527V3H9.388v7.321H6.75a.76.76 0 0 0-.675.393.638.638 0 0 0-.075.306c0 .152.052.305.16.427l5.25 6.283z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
export default Download;
