#!/usr/bin/env bash
branch_name="$(git symbolic-ref HEAD 2>/dev/null)" ||
branch_name="(unnamed branch)"     # detached HEAD

branch_name=${branch_name##refs/heads/}

cmd="netlify deploy --site-id bolt-design-system.netlify.com --path apps/pattern-lab--workshop/www"

if [[ $branch_name != 'epic/refactor' ]]; then
  echo 'Draft deploy'
  cmd="$cmd --draft"
else
  echo 'Main deploy, not a draft'
fi

echo 'Begin deploying to Netlify..'
$cmd
