const { normalizeUrlAlias } = require('../utils/normalize-url-alias');
const { branchName } = require('../utils/branch-name');

describe('branch name for url aliases exists', () => {
  test('current branch name exists', async () => {
    expect(branchName).toBeDefined();
  });

  test('url-friendly branch name formatted correctly', async () => {
    expect(branchName).toEqual(expect.not.stringContaining(' '));
    expect(branchName).toEqual(expect.not.stringContaining('.'));
    expect(branchName).toEqual(expect.not.stringContaining('--'));
  });

  test('now.sh deploy branch alias name', async () => {
    const result = normalizeUrlAlias(branchName);
    const resultWithoutHttps = result.replace('https://', '');

    expect(result).toContain('boltdesignsystem.com');
    expect(result).toContain('boltdesignsystem.com');
    expect(resultWithoutHttps.length <= 62).toEqual(true);
  });
});
