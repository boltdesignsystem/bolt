#!/bin/bash

set -e -u

# Set the following environment variables:
# DEPLOY_BUCKET = your bucket name
# DEPLOY_BUCKET_PREFIX = a directory prefix within your bucket
# DEPLOY_BRANCHES = regex of branches to deploy; leave blank for all
# DEPLOY_EXTENSIONS = whitespace-separated file exentions to deploy; leave blank for "jar war zip"
# DEPLOY_FILES = whitespace-separated files to deploy; leave blank for $TRAVIS_BUILD_DIR/target/*.$extensions
# AWS_ACCESS_KEY_ID = AWS access ID
# AWS_SECRET_ACCESS_KEY = AWS secret
# AWS_SESSION_TOKEN = optional AWS session token for temp keys
# PURGE_OLDER_THAN_DAYS = Files in the .../deploy and .../pull-request prefixes in S3 older than this number of days will be deleted; leave blank for 90, 0 to disable.

if [[ -z "${DEPLOY_BUCKET}" ]]
then
    echo "Bucket not specified via \$DEPLOY_BUCKET"
fi

DEPLOY_BUCKET_PREFIX=${DEPLOY_BUCKET_PREFIX:-}

DEPLOY_BRANCHES=${DEPLOY_BRANCHES:-}

DEPLOY_EXTENSIONS=${DEPLOY_EXTENSIONS:-"jar war zip"}

DEPLOY_SOURCE_DIR=${DEPLOY_SOURCE_DIR:-$TRAVIS_BUILD_DIR/target}

PURGE_OLDER_THAN_DAYS=${PURGE_OLDER_THAN_DAYS:-"90"}

if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]
then
    target_path=pull-request/$TRAVIS_PULL_REQUEST

elif [[ -z "$DEPLOY_BRANCHES" || "$TRAVIS_BRANCH" =~ "$DEPLOY_BRANCHES" ]]
then
    target_path=deploy/$TRAVIS_BRANCH/$TRAVIS_BUILD_NUMBER

else
    echo "Not deploying."
    exit

fi

discovered_files=""
for ext in ${DEPLOY_EXTENSIONS}
do
    discovered_files+=" $(ls $DEPLOY_SOURCE_DIR/*.${ext} 2>/dev/null || true)"
done

files=${DEPLOY_FILES:-$discovered_files}

if [[ -z "$files" ]]
then
    echo "Files not found; not deploying."
    exit 1
fi

target=builds/${DEPLOY_BUCKET_PREFIX}${DEPLOY_BUCKET_PREFIX:+/}$target_path/

pip install --upgrade --user awscli
export PATH=~/.local/bin:$PATH

for file in $files
do
    aws s3 cp $file s3://$DEPLOY_BUCKET/$target
done

if [[ $PURGE_OLDER_THAN_DAYS -ge 1 ]]
then
    echo "Cleaning up builds in S3 older than $PURGE_OLDER_THAN_DAYS days . . ."

    cleanup_prefix=builds/${DEPLOY_BUCKET_PREFIX}${DEPLOY_BUCKET_PREFIX:+/}
    older_than_ts=`date -d"-${PURGE_OLDER_THAN_DAYS} days" +%s`

    for suffix in deploy pull-request
    do
        aws s3api list-objects --bucket $DEPLOY_BUCKET --prefix $cleanup_prefix$suffix/ --output=text | \
        while read -r line
        do
            last_modified=`echo "$line" | awk -F'\t' '{print $4}'`
            if [[ -z $last_modified ]]
            then
                continue
            fi
            last_modified_ts=`date -d"$last_modified" +%s`
            filename=`echo "$line" | awk -F'\t' '{print $3}'`
            if [[ $last_modified_ts -lt $older_than_ts ]]
            then
                if [[ $filename != "" ]]
                then
                    echo "s3://$DEPLOY_BUCKET/$filename is older than $PURGE_OLDER_THAN_DAYS days ($last_modified). Deleting."
                    aws s3 rm s3://$DEPLOY_BUCKET/$filename
                fi
            fi
        done
    done
fi
