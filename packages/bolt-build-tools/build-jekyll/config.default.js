module.exports = {
  source: './packages/website-jekyll/source',
  dest: './bolt-website',
  commandPrefix: 'bundle exec jekyll',
  incremental: false,
  watch: true,
  drafts: true
};
