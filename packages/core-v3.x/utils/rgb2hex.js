// convert RGB to hex
// http://stackoverflow.com/questions/1740700/get-hex-value-rather-than-rgb-value-using-jquery
export function rgb2hex(rgb) {
  if (rgb.search('rgb') === -1) {
    return rgb;
  }

  const rgbValue = rgb.match(
    /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/,
  );

  function hex(x) {
    return (0 + parseInt(x, 10).toString(16)).slice(-2);
  }

  return `#${hex(rgbValue[1])}${hex(rgbValue[2])}${hex(rgbValue[3])}`;
}
