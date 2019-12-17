import * as Icons from '@bolt/components-icon/registry';
import { h } from '@bolt/core/renderers';

export const CustomerService = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg
      data-name="ffe51f9d-3a5d-4cc4-bfad-3c8131365f10"
      {...otherProps}
      viewBox="0 0 31.51 31.51">
      <path
        fill={bgColor}
        d="M25.63 5.82a12.23 12.23 0 011.66 3.92 9.3 9.3 0 012.26 6 9.81 9.81 0 01-6.13 8.87h1.21v2.95L21 25.37a11.89 11.89 0 01-5.14-.13 17.38 17.38 0 01-3.52.36h-.73a13.47 13.47 0 007.13 2 14 14 0 002.05-.15l5.82 4.06v-6.43a11.49 11.49 0 004.92-9.32 11.64 11.64 0 00-5.88-9.94M9.38 21.15l-2.49 1.49v-2.59A9.65 9.65 0 012 11.8C2 6.36 6.82 2 12.8 2s10.83 4.36 10.83 9.8-4.85 9.85-10.83 9.85a11.33 11.33 0 01-3.42-.5m16.22-9.33C25.6 5.29 19.87 0 12.8 0S0 5.29 0 11.82a11.51 11.51 0 004.92 9.32v5.45l4.72-3.3a14.05 14.05 0 003.16.36c7.07 0 12.8-5.3 12.8-11.83"
        data-name="aee4f716-9c84-424c-99e9-6eca3aec5305"
      />
    </svg>
  );
};

Icons.set('customer-service', CustomerService);
