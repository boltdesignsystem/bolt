import { h } from '@bolt/core';

export const Filter = ({ bgColor, fgColor, size, ...otherProps }) => (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 32 32">
      <path
        d="M26.906 6.581A.996.996 0 0 0 26 6H6a.996.996 0 0 0-.906.581 1.01 1.01 0 0 0 .144 1.069L13 16.825V23c0 .381.213.725.55.894l4 2A1 1 0 0 0 19 25v-8.175l7.763-9.181a.999.999 0 0 0 .144-1.062l-.001-.001zm-9.669 9.232c-.15.181-.237.406-.237.644v6.925l-2-1v-5.925a.98.98 0 0 0-.237-.644L8.157 8.001h15.687l-6.606 7.812h-.001z"
        fill={bgColor}
        fill-rule="nonzero"
      />
    </svg>
  );
