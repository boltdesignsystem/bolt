// import { Preact, h } from 'preact';
const FullScreen = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Full Screen</title>
      <defs>
        <path id="a" d="M8.992 10H0V.998h8.992z" />
      </defs>
      <g fill="none" fill-rule="evenodd">
        <path d="M0 0h24v24H0z" />
        <path
          d="M22 2.94v-.03a.939.939 0 0 0-.069-.3v-.012s0-.006-.006-.006a1.104 1.104 0 0 0-.156-.256l-.006-.006-.006-.006-.006-.006v-.006c-.025-.025-.044-.05-.069-.069h-.006l-.006-.006s-.006 0-.006-.006h-.006l-.006-.006a.812.812 0 0 0-.256-.156H21.378a.939.939 0 0 0-.3-.069H15.01c-.55 0-1 .45-1 1s.45 1 1 1h3.588l-5.294 5.294a1.005 1.005 0 0 0 0 1.413.999.999 0 0 0 1.412 0l5.287-5.313v3.588c0 .55.45 1 1 1s1-.45 1-1V2.945L22 2.94z"
          fill="#1F2555"
        />
        <g transform="translate(2 11.974)">
          <mask id="b" fill="#fff">
            <use xlinkHref="#a" />
          </mask>
          <path
            d="M7.294 1.297L2 6.591V3.003c0-.55-.45-1-1-1s-1 .45-1 1v6c0 .138.025.27.075.387 0 0 0 .006.006.006v.011a.96.96 0 0 0 .15.244l.006.006.006.007.006.006.006.006c.025.025.044.05.069.07l.006.005.006.006.006.006.006.006.006.006c.075.063.15.106.231.144h.012c.106.044.225.075.35.081h6.042c.55 0 1-.45 1-1s-.45-1-1-1H3.408l5.294-5.294a1.005 1.005 0 0 0 0-1.413.992.992 0 0 0-1.413 0l.005.004z"
            fill="#1F2555"
            mask="url(#b)"
          />
        </g>
      </g>
    </svg>
  );
};
export default FullScreen;
