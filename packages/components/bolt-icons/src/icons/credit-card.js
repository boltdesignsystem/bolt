import { h } from '@bolt/core/renderers';

export const CreditCard = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg>
      <path
        d="M21.3 0H3.7C1.7 0 0 1.6 0 3.6v9.8c0 2 1.7 3.6 3.7 3.6h17.6c2 0 3.7-1.6 3.7-3.6V3.6c0-2-1.7-3.6-3.7-3.6zm2.5 13.4c0 1.3-1.1 2.4-2.5 2.4H3.7c-1.4 0-2.5-1.1-2.5-2.4V9.8h22.6v3.6zm0-4.8H1.2V6.2h22.6v2.4zm0-3.6H1.2V3.6c0-1.3 1.1-2.4 2.5-2.4h17.6c1.4 0 2.5 1.1 2.5 2.4V5z"
        class="st0"
      />
    </svg>
  );
};
