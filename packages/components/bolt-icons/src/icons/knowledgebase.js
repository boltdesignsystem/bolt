import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const Knowledgebase = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg data-name="Layer 1" {...otherProps} viewBox="0 0 32.02 28.73">
      <path
        fill={bgColor}
        fill-rule="evenodd"
        d="M.9.42H8a.94.94 0 011 1v26a1 1 0 01-.9 1H.9a.92.92 0 01-.9-1v-26a.92.92 0 01.9-1zM2 26.52h5v-2H2zm0-22.1h5v-2H2zm0 18h5v-16H2zm8.9-22H18a.94.94 0 011 1v26a1 1 0 01-.9 1H11a.92.92 0 01-.9-1v-26a.81.81 0 01.8-1zm1.1 26.1h5v-2h-5zm0-22.1h5v-2h-5zm0 18h5v-16h-5zm7.8-21.3l7-1.1a1 1 0 011.1.8l4.1 25.7a1 1 0 01-.8 1.1l-7 1.1a1 1 0 01-1.1-.8L19 2.32a1 1 0 01.8-1.2zm5.1 25.6l4.9-.8-.3-2-4.9.8zm-3.4-21.8l4.9-.8-.3-2-4.9.8zm2.8 17.8l4.9-.8-2.5-15.8-4.9.8z"
        data-name="path-1"
      />
    </svg>
  );
};

Icons.set('knowledgebase', Knowledgebase);
