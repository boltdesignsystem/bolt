module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/exec',
      {
        verifyConditionsCmd: './scripts/publishing/verify.sh',
        verifyReleaseCmd: './scripts/publishing/verifyRelease.sh ${nextRelease.version}',
        publishCmd: './scripts/publishing/publish.sh ${nextRelease.version}',
      },
    ],
  ],
  branch: 'feature/update-lerna-publish',
  // branch: 'release/2.x',
};
