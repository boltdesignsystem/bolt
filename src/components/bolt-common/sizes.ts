export const Sizes = {
  xsmall: 'xsmall',
  small: 'small',
  medium: 'medium',
  large: 'large',
  xlarge: 'xlarge',
  super: 'super'
};

export type Size = typeof Sizes;

export function cssClassForSize(
  size: string, 
  prefix: string
) {
  return Sizes.hasOwnProperty(size) ? `${prefix}${size}` : null;
}