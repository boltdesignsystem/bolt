const sizes = {
  xsmall: 'xsmall',
  small: 'small',
  medium: 'medium',
  large: 'large',
  xlarge: 'xlarge'
};
module.exports.sizes = sizes;

function cssClassForSize( size, prefix ) {
  return size ? `${prefix}${sizes.size}` : null;
}
module.exports.cssClassForSize = cssClassForSize;