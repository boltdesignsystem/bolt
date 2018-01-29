#!/usr/bin/env bash
branch_name="$(git symbolic-ref HEAD 2>/dev/null)" ||
branch_name="(unnamed branch)"     # detached HEAD

branch_name=${branch_name##refs/heads/}

cmd="netlify deploy --site-id bolt-design-system.com --path dist --draft"

# if [[ $branch_name != 'release/0.x' ]]; then
#   echo 'Draft deploy'
#   cmd="$cmd --draft"
# else
#   echo 'Main deploy, not a draft'
# fi

if [[ $NETLIFY_TOKEN ]]; then
  cmd="$cmd --access-token $NETLIFY_TOKEN"
fi

echo 'Begin deploying to Netlify..'
$cmd
