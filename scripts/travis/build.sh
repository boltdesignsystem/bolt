before_script:
        - phpenv config-rm xdebug.ini
        - composer global require hirak/prestissimo
        - yarn --production
        # - yarn run composer
      script: yarn run test
      cache:
        yarn: true
        directories:
          - node_modules
          - docs-site/cache

    - stage: build-and-deploy
      name: 'Linting'
      before_script: yarn
      script: 
        - yarn run lint:style
        - yarn run lint:js
      cache:
        yarn: true
        directories:
          - node_modules

    - stage: build-and-deploy
      name: 'Build + Deploy'
      before_script:
        - 
        - composer global require hirak/prestissimo
        - yarn run setup
      script:
        - yarn run build:website
        - yarn run deploy
        # - sh./scripts/update-read-only-git-repos.sh
      cache:
        yarn: true
        directories:
          - node_modules
          - docs-site/cache

phpenv config-rm xdebug.ini