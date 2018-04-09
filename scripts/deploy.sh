#!/usr/bin/env bash
branch_name="$(git symbolic-ref HEAD 2>/dev/null)" ||
branch_name="detached-HEAD"     # detached HEAD

branch_name=${branch_name##refs/heads/}

if [[ $TRAVIS == 'true' ]]; then
  # Installs netlify deploy cli
  curl -L https://github.com/netlify/netlifyctl/releases/download/v0.3.2/netlifyctl-linux-amd64-0.3.2.tar.gz | tar zx
  netlifycli='./netlifyctl';
  if [[ $TRAVIS_PULL_REQUEST == 'false' ]]; then
    branch_name=$TRAVIS_BRANCH
  else
    branch_name=$TRAVIS_PULL_REQUEST_BRANCH
  fi
  deploy_message="$branch_name $TRAVIS_COMMIT"
else
  netlifycli=`which netlifyctl`;
  deploy_message="$branch_name"
fi

echo "On this git branch: $branch_name"

deploy_message=${deploy_message// /_} # Replaces all spaces with `_` - b/c dealing with quoting it properly sucks
cmd="$netlifycli deploy --site-id bolt-design-system.netlify.com --base-directory www --yes --message $deploy_message"

if [[ $branch_name != 'release/1.x' ]]; then
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

# The command outputs about 1200 lines with these two phrases; filtering them out for cleaner output
$cmd | grep -v "Uploading objects" | grep -v "Counting objects"

# Hit the Netlify API to get all deploys, then pipe it into `node` so I can just show the first object in that array.
curl --silent  \
     -H "Authorization: Bearer $NETLIFY_TOKEN" \
     https://api.netlify.com/api/v1/sites/bolt-design-system.netlify.com/deploys | node <<< "var o = $(cat); console.log(JSON.stringify(o[0], null, 4));"
