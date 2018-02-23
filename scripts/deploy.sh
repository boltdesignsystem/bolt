#!/usr/bin/env bash
branch_name="$(git symbolic-ref HEAD 2>/dev/null)" ||
branch_name="(unnamed branch)"     # detached HEAD

branch_name=${branch_name##refs/heads/}

if [[ $TRAVIS == 'true' ]]; then
  curl -L https://github.com/netlify/netlifyctl/releases/download/v0.3.2/netlifyctl-linux-amd64-0.3.2.tar.gz | tar zx # Installs netlify deploy cli
  netlifycli='./netlifyctl';
  deploy_message="Branch: $branch_name Commit: $TRAVIS_COMMIT_MESSAGE - $TRAVIS_COMMIT"
else
  netlifycli=`which netlifyctl`;
  deploy_message="Branch: $branch_name"
fi

if [[ $TRAVIS_PULL_REQUEST == 'false' ]]; then
  branch_name=$TRAVIS_BRANCH;
fi

echo "On this git branch: $branch_name"

cmd="$netlifycli deploy --site-id bolt-design-system.netlify.com --base-directory www --yes --message $deploy_message"

if [[ $branch_name != 'master' ]]; then
  echo 'Draft deploy'
  cmd="$cmd --draft"
else
  echo 'Main deploy, not a draft'
fi

echo 'Running this command (not showing NETLIFY_TOKEN though):'
echo $cmd
echo 'Begin deploying to Netlify..'

if [[ $NETLIFY_TOKEN ]]; then
  cmd="$cmd --access-token $NETLIFY_TOKEN"
fi

$cmd

# Hit the Netlify API to get all deploys, then pipe it into `node` so I can just show the first object in that array.
curl --silent  \
     -H "Authorization: Bearer $NETLIFY_TOKEN" \
     https://api.netlify.com/api/v1/sites/bolt-design-system.netlify.com/deploys | node <<< "var o = $(cat); console.log(JSON.stringify(o[0], null, 4));"
