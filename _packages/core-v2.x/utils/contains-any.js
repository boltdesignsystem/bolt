// helper function to let you quickly check if an array of elements is inside a component
export function containsAny(source, target) {
  const result = source.filter(function(item) {
    return target.indexOf(item) > -1;
  });
  return result.length > 0;
}
