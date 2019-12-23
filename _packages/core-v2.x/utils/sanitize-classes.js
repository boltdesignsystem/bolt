export function sanitizeBoltClasses(
  elementToSanitize,
  prefixesToRemove = ['c-bolt-'],
) {
  let prefixes = Array.from(prefixesToRemove);
  // Remove any `c-bolt-` prefixed classes but leave the rest
  let remainingClasses;

  prefixes.forEach(function(prefix) {
    remainingClasses = elementToSanitize.className
      .split(' ')
      .filter(function(c) {
        return c.lastIndexOf(prefix, 0) !== 0;
      });
  });

  return remainingClasses.join(' ').trim();
}
