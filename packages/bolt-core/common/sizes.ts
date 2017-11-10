export const Sizes = {
  xsmall: 'xsmall',
  small: 'small',
  medium: 'medium',
  large: 'large',
  xlarge: 'xlarge',
  super: 'super'
};

export type Size = typeof Sizes;

export function cssClassForSize( size: Size ) {
  return size ? `u-${size}` : null;
}
