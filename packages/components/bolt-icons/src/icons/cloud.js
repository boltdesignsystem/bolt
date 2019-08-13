import { h } from '@bolt/core/renderers';

export const Cloud = ({ bgColor, fgColor, size, title, ...otherProps }) => {
  return (
    <svg
      data-name="a2a1a4ef-b4e5-4856-808b-15912bee1329"
      {...otherProps}
      viewBox="0 0 31.98 23.96">
      <title>{title}</title>
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M23 21.96H9a7 7 0 010-14h.1a7 7 0 016.9-6 6.9 6.9 0 016.7 5 7.51 7.51 0 01.3 15m1.1-16.9a9 9 0 00-16.6 1 9.1 9.1 0 00-7.5 8.9 9 9 0 009 9h14a9.53 9.53 0 001.1-18.9"
        data-name="ab2e5896-d1c7-47c5-af04-4ac482a776f5"
      />
    </svg>
  );
};
