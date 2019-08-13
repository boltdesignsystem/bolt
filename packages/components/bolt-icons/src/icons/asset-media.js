import { h } from '@bolt/core/renderers';

export const AssetMedia = ({
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
        <path d="M5.25 12.5v8.75c0 .69-.561 1.25-1.25 1.25h-.75c-.689 0-1.25-.56-1.25-1.25V12.5h3.25zM22.5 2v19.25c0 .69-.561 1.25-1.25 1.25H6.989c.173-.401.261-.82.261-1.25V2H22.5zM5.25 0v10.5H0v10.75a3.254 3.254 0 003.25 3.25h18a3.254 3.254 0 003.25-3.25V0H5.25z" />
        <path d="M8.25 5H21.5V3H8.25zM8.25 17.75H21.5v-2H8.25zM8.25 20.75H21.5v-2H8.25zM10.251 12.75h9.25V8h-9.25v4.75zm-2 2h13.25V6H8.251v8.75z" />
      </g>
    </svg>
  );
};
