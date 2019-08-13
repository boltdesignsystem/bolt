import { h } from '@bolt/core/renderers';

export const AssetInfographic = ({
  bgColor,
  fgColor,
  size,
  title,
  ...otherProps
}) => {
  return (
    <svg {...otherProps} viewBox="0 0 24 24">
      <title>{title}</title>
      <g fill={bgColor} fill-rule="evenodd">
        <path d="M8.5 8c.275 0 .5.225.5.5s-.225.5-.5.5a.501.501 0 01-.5-.5c0-.275.225-.5.5-.5m0 3a2.5 2.5 0 100-5 2.5 2.5 0 000 5" />
        <path d="M19 20H7.412L16 11.413l4 4v3.588c0 .55-.45 1-1 1V20zM4 5c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v7.587l-3.294-3.294a1.005 1.005 0 00-1.413 0L4.649 19.937a1 1 0 01-.65-.938v-14L4 5zm18 10V5c0-1.656-1.344-3-3-3H5C3.344 2 2 3.344 2 5v14a3.002 3.002 0 002.988 3H19c1.656 0 3-1.344 3-3v-4z" />
      </g>
    </svg>
  );
};
