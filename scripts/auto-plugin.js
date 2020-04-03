const { Auto } = require('@auto-it/core');

class BoltAutoPlugin {
  constructor(config) {
    this.config = config;
  }

  apply(auto) {
    auto.hooks.onCreateChangelog.tap('Bolt', (changelog) =>
      changelog.hooks.renderChangelogTitle.tap(
        'Changelog Titles',
        (label, changelogTitles) => `### ${changelogTitles[label]}`,
      ),
    );
  }
}

module.exports = BoltAutoPlugin;
