import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const Filter = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg {...otherProps} viewBox="0 0 32 32">
      <path
        fill={bgColor}
        fill-rule="nonzero"
        d="M26.906 6.581A.996.996 0 0026 6H6a.996.996 0 00-.906.581 1.01 1.01 0 00.144 1.069L13 16.825V23c0 .381.213.725.55.894l4 2A1 1 0 0019 25v-8.175l7.763-9.181a.999.999 0 00.144-1.062l-.001-.001zm-9.669 9.232c-.15.181-.237.406-.237.644v6.925l-2-1v-5.925a.98.98 0 00-.237-.644L8.157 8.001h15.687l-6.606 7.812h-.001z"
      />
    </svg>
  );
};

Icons.set('filter', Filter);
