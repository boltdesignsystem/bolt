const gitSha = '84a78fde53';

const results = {
  deployments: [
    {
      uid: '77ClAeOP2J1cbSHTKyeUCDIg',
      name: 'boltdesignsystem',
      url: 'boltdesignsystem-yrlbfhszuk.now.sh',
      created: 1551897123449,
      state: 'READY',
      type: 'DOCKER',
      creator: { uid: 'OIPVP1rkcU9WBe9LfpuW28lF' },
      instanceCount: 1,
      scale: { sfo1: { min: 1, max: 1 } },
      meta: { gitSha: '84a78fd' },
    },
    {
      uid: 'XcQ0KRI8XkopDOU1XiqTHTvn',
      name: 'boltdesignsystem',
      url: 'boltdesignsystem-dhuwkwvkaq.now.sh',
      created: 1551896535961,
      state: 'READY',
      type: 'DOCKER',
      creator: { uid: 'OIPVP1rkcU9WBe9LfpuW28lF' },
      instanceCount: 1,
      scale: { sfo1: { min: 1, max: 1 } },
      meta: { gitSha: '6562d5a' },
    },
    {
      uid: 'XZ3XWy5v1yjqFRU4alRHgCIC',
      name: 'boltdesignsystem',
      url: 'boltdesignsystem-tmhwvqpjks.now.sh',
      created: 1551894294274,
      state: 'READY',
      type: 'DOCKER',
      creator: { uid: 'OIPVP1rkcU9WBe9LfpuW28lF' },
      instanceCount: 1,
      scale: { sfo1: { min: 1, max: 1 } },
      meta: { gitSha: 'f057694' },
    },
    {
      uid: 'oBiZA8iGzwAUiNaVYhwAjFV3',
      name: 'boltdesignsystem',
      url: 'boltdesignsystem-mvswvcfzhz.now.sh',
      created: 1551885884798,
      state: 'READY',
      type: 'DOCKER',
      creator: { uid: 'OIPVP1rkcU9WBe9LfpuW28lF' },
      instanceCount: 1,
      scale: { sfo1: { min: 1, max: 1 } },
      meta: { gitSha: 'e2290d9' },
    },
    {
      uid: 'IA5qGHJGWUdqjEDA6gqLCDD3',
      name: 'boltdesignsystem',
      url: 'boltdesignsystem-ahnhvdyxjq.now.sh',
      created: 1551885585277,
      state: 'READY',
      type: 'DOCKER',
      creator: { uid: 'OIPVP1rkcU9WBe9LfpuW28lF' },
      instanceCount: 1,
      scale: { sfo1: { min: 1, max: 1 } },
      meta: { gitSha: '96f7c1f' },
    },
  ],
};

const resultsWithGitSha = results.deployments.filter(
  d => d.meta.gitSha === gitSha,
);

const fallbackResultsWithGitSha = results.deployments.filter(
  d => gitSha.includes(d.meta.gitSha),
);

const result = resultsWithGitSha.find(d => d.url);

// if an exact match isn't found, check partial matches and sort by most recent
fallbackResultsWithGitSha.sort(function(a, b) {
  // Turn created unix time strings into dates, and then sort by what happened most recently
  return new Date(a.created) - new Date(b.created);
});
const fallbackResults = fallbackResultsWithGitSha.find(d => d.url);

// console.log(resultsWithGitSha);
// console.log(fallbackResultsWithGitSha);

// console.log(result);
// console.log(fallbackResults);
