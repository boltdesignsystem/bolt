function getValue(a) {
  let value;
  let i;
  switch (a.constructor.name) {
    case 'SassList':
      value = [];
      for (i = 0; i < a.getLength(); i++) {
        value.push(getValue(a.getValue(i)));
      }
      break;
    case 'SassMap':
      value = {};
      for (i = 0; i < a.getLength(); i++) {
        value[a.getKey(i).getValue()] = getValue(a.getValue(i));
      }
      break;
    case 'SassColor':
      if (a.getA() === 1) {
        value = `rgb(${Math.round(a.getR())}, ${Math.round(
          a.getG(),
        )}, ${Math.round(a.getB())})`;
      } else {
        value = `rgba(${Math.round(a.getR())}, ${Math.round(
          a.getG(),
        )}, ${Math.round(a.getB())}, ${a.getA()})`;
      }
      break;
    case 'SassNumber':
      value = a.getValue();
      if (a.getUnit()) {
        value += a.getUnit();
      }
      break;
    default:
      value = a.getValue();
  }
  return value;
}

module.exports = getValue;
