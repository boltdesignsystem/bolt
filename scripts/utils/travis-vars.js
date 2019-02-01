const {
  // if in Travis, then it's `"true"`
  TRAVIS,
  // for push builds, or builds not triggered by a pull request, this is the name of the branch.
  // for builds triggered by a pull request this is the name of the branch targeted by the pull request.
  // for builds triggered by a tag, this is the same as the name of the tag(TRAVIS_TAG).
  TRAVIS_BRANCH,
  // if the current job is a pull request, the name of the branch from which the PR originated
  // if the current job is a push build, this variable is empty("").
  TRAVIS_PULL_REQUEST_BRANCH,
  // The pull request number if the current job is a pull request, “false” if it’s not a pull request.
  TRAVIS_PULL_REQUEST,
  // The slug (in form: owner_name/repo_name) of the repository currently being built.
  TRAVIS_REPO_SLUG,
  // If the current build is for a git tag, this variable is set to the tag’s name
  TRAVIS_TAG,
  TRAVIS_BUILD_WEB_URL,
} = process.env;

module.exports = {
  TRAVIS,
  TRAVIS_PULL_REQUEST,
  TRAVIS_BRANCH,
  TRAVIS_PULL_REQUEST_BRANCH,
  TRAVIS_REPO_SLUG,
  TRAVIS_TAG,
  TRAVIS_BUILD_WEB_URL,
};
