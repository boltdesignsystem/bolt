// import { Preact, h } from 'preact';
const DataIntegrations = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" {...otherProps}>
      <title>Icon/product/Platform/Data-Integrations</title>
      <defs>
        <path id="a" d="M31.508 15.754V.001H0V31.508h31.508z" />
      </defs>
      <g fill="currentColor" fill-rule="evenodd">
        <g transform="translate(0 .491)">
          <mask id="b" fill="currentColor">
            <use xlinkHref="#a" />
          </mask>
          <path
            d="M6.892 1.97H25.6a.985.985 0 0 0 0-1.97H6.892a.985.985 0 1 0 0 1.97zM1.97 29.538h27.57V9.848H1.968v19.69zM0 31.508h31.508V7.878H0v23.63zm2.954-25.6h25.6a.985.985 0 0 0 0-1.97h-25.6a.986.986 0 0 0 0 1.97z"
            fill="currentColor"
            mask="url(#b)"
          />
        </g>
        <path
          d="M8.862 20.184c0-.544.44-.984.984-.984h11.816a.984.984 0 1 1 0 1.969H9.846a.985.985 0 0 1-.984-.985"
          fill="currentColor"
        />
        <path
          d="M15.754 13.291c.543 0 .984.442.984.985v11.816a.985.985 0 0 1-1.969 0V14.276c0-.543.441-.985.985-.985"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
export default DataIntegrations;
