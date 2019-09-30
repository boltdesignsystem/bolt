function normalizeUrlAlias(prefix, suffix = '.boltdesignsystem.com') {
  // passing an empty prefix will deploy to the main boltdesignsystem.com site
  if (prefix) {
    const normalizedUrlPrefix = prefix
      .replace(/\//g, '-') // `/` => `-`
      .replace('--', '-') // `--` => `-` now.sh subdomains can't have `--` for some reason
      .replace(/\./g, '-'); // `.` => `-`

    let normalizedUrlBase = `${encodeURIComponent(normalizedUrlPrefix)}`;

    // if the full url is 62 characters or longer, truncate to fix errors on now.sh errors when trying to alias
    if (normalizedUrlBase.length + suffix.length >= 62) {
      normalizedUrlBase = normalizedUrlBase.substring(0, 62 - suffix.length);

      if (normalizedUrlBase.substr(normalizedUrlBase.length - 1) === '-') {
        normalizedUrlBase = normalizedUrlBase.slice(0, -1);
      }
    }

    let aliasedUrl = `https://${normalizedUrlBase}${suffix}`;
    // console.log(aliasedUrl);
    return aliasedUrl;
  }
}

module.exports = {
  normalizeUrlAlias,
};
