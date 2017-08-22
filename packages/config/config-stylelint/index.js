module.exports = {
  // extends: 'stylelint-config-sass-guidelines',
  ignoreFiles: [

  ],
  plugins: [
    'stylelint-order',
    'stylelint-scss',
    'stylelint-selector-bem-pattern'
  ],
  rules: {
    'plugin/selector-bem-pattern': {
      preset: 'bem',
      componentName: '(((o-|c-|u-|t-|s-|is-|has-|no-|_|js-|qa-)(bolt-)[a-z0-9]+(?!-$)-?)+)',
      componentSelectors: {
        initial: "\\.{componentName}(((__|--)(([a-z0-9\\[\\]'=]+(?!-$)-?)+))+)?$"
      },
      // componentSelectors: '^\\.ns-{componentName}(?:-[a-zA-Z]+)?$'
      // ignoreSelectors: [
      //   '.*\\.no-js.*',
      //   '.*\\.js-.*',
      //   '.*\\.lt-ie.*'
      // ]
    },
    'at-rule-blacklist': ['debug'],
    'at-rule-no-vendor-prefix': true,
    'block-no-empty': true,
    'block-opening-brace-space-before': 'always',
    'block-closing-brace-space-after': 'always-single-line',
    'color-hex-case': 'lower',
    'color-hex-length': 'long',
    'color-named': 'never',
    'color-no-invalid-hex': true,
    'declaration-bang-space-after': 'never',
    'declaration-bang-space-before': 'always',
    'declaration-block-semicolon-newline-after': 'always-multi-line',
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-single-line-max-declarations': 1,
    'declaration-block-trailing-semicolon': 'always',
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'declaration-property-value-blacklist': {
      '/^border/': [
        'none'
      ]
    },
    'function-comma-space-after': 'always-single-line',
    'function-parentheses-space-inside': 'never-single-line',
    'function-url-quotes': 'always',
    // indentation: 2,
    'length-zero-no-unit': true,
    'max-nesting-depth': [1, {
      ignore: ['blockless-at-rules'],
      ignoreAtRules: ['media', 'function', 'if', 'each'],
    }],
    'media-feature-name-no-vendor-prefix': true,
    'media-feature-parentheses-space-inside': 'never',
    'no-missing-end-of-source-newline': true,
    'number-leading-zero': 'always',
    'number-no-trailing-zeros': true,
    // 'order/properties-alphabetical-order': true,
    'property-no-unknown': true,
    'property-no-vendor-prefix': true,
    'rule-empty-line-before': ['always-multi-line', {
      except: ['first-nested'],
      ignore: ['after-comment'],
    }],
    'scss/at-extend-no-missing-placeholder': true,
    'scss/at-function-pattern': '(bolt-|_bolt-)+[a-z0-9]+',

    'scss/at-function-pattern': '^(bolt-|_bolt-)[a-z0-9\\-]+$',
    'scss/at-mixin-pattern': '^(bolt-|_bolt-)[a-z0-9\\-]+$',
    // 'scss/at-function-pattern': '/bolt-.+/',

    //
    'scss/at-import-no-partial-leading-underscore': true,
    // 'scss/at-import-partial-extension-blacklist': ['scss'],
    // 'scss/dollar-variable-colon-space-after': 'always',
    // 'scss/dollar-variable-colon-space-before': 'never',
    // // 'scss/dollar-variable-pattern': '^[_]?[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    'scss/dollar-variable-pattern': ['^(bolt-|_bolt-)[a-z]+([a-z0-9-]+[a-z0-9]+)?$', {
      // ignore: ['local']
    }],
    'scss/percent-placeholder-pattern': '^(bolt-)[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
    //
    'scss/selector-no-redundant-nesting-selector': true,

    // 'selector-list-comma-newline-after': 'always',
    'selector-max-compound-selectors': 3,
    'selector-max-id': 0,
    'selector-no-qualifying-type': [true, {
      ignore: ['attribute']
    }],
    'selector-no-vendor-prefix': true,
    'selector-pseudo-element-colon-notation': 'single',
    'selector-pseudo-element-no-unknown': true,
    'shorthand-property-no-redundant-values': true,
    'string-quotes': 'single',
    'value-no-vendor-prefix': true,


    'no-duplicate-selectors': true,


    // 'scss/dollar-variable-colon-space-after': 'always-single-line',
    // 'selector-class-pattern': '',


    'order/properties-order': [
      'display',
      'flex-basis',
      'flex-shrink',
      'flex-grow',
      'visibility',

      'position',
      'z-index',

      'top',
      'right',
      'bottom',
      'left',
      'float',
      'clear',

      'width',
      'height',
      'min-width',
      'min-height',
      'max-width',
      'max-height',
      'overflow-x',
      'overflow-y',

      'margin',
      'padding',


      'text-align',
      'color',
      'cursor',
      'list-style',
      'text-decoration',
      'text-shadow',
      'text-transform',
      'vertical-align'
    ],


    'max-empty-lines': 6,


    'scss/dollar-variable-no-missing-interpolation': true,
    // 'scss/at-mixin-argumentless-call-parentheses': 'never',

    'at-rule-name-case': 'lower',
    'at-rule-name-space-after': 'always-single-line',

    //
    'at-rule-semicolon-newline-after': 'always',
    // 'block-closing-brace-newline-after': ['always', {
    //   ignoreAtRules: ['if', 'else'],
    // }],
    'block-closing-brace-newline-before': 'always-multi-line',
    'block-closing-brace-space-before': 'always-single-line',
    'block-opening-brace-newline-after': 'always-multi-line',
    'block-opening-brace-space-after': 'always-single-line',

    'comment-empty-line-before': ['always', {
      except: ['first-nested'],
      ignore: ['stylelint-commands'],
    }],
    'comment-whitespace-inside': 'always',
    // 'declaration-block-no-shorthand-property-overrides': true,

    // 'declaration-block-semicolon-newline-after': 'always-multi-line',
    // 'declaration-block-semicolon-space-after': 'always-single-line',
    // 'declaration-colon-newline-after': 'always-multi-line',
    // 'declaration-colon-space-before': 'never',
    // 'font-weight-notation': 'numeric',
    // 'function-calc-no-unspaced-operator': true,
    // 'function-comma-newline-after': 'always-multi-line',
    // 'function-comma-space-before': 'never',
    // 'function-linear-gradient-no-nonstandard-direction': true,
    // 'function-max-empty-lines': 0,
    // 'function-name-case': 'lower',
    // 'function-parentheses-newline-inside': 'always-multi-line',
    // 'function-parentheses-space-inside': 'never-single-line',
    // 'function-url-quotes': 'always',
    // 'function-whitespace-after': 'always',

    // 'keyframe-declaration-no-important': true,

    //
    // 'media-feature-colon-space-after': 'always',
    // 'media-feature-colon-space-before': 'never',
    // 'media-feature-range-operator-space-after': 'always',
    // 'media-feature-range-operator-space-before': 'always',
    // 'media-query-list-comma-newline-after': 'always-multi-line',
    // 'media-query-list-comma-space-after': 'always-single-line',
    // 'media-query-list-comma-space-before': 'never',
    //
    // 'no-empty-source': true,
    // 'no-eol-whitespace': true,
    // 'no-extra-semicolons': true,
    // 'no-invalid-double-slash-comments': true,
    // 'property-case': 'lower',
    //
    // 'selector-attribute-brackets-space-inside': 'never',
    // 'selector-attribute-operator-space-after': 'never',
    // 'selector-attribute-operator-space-before': 'never',
    // 'selector-combinator-space-after': 'always',
    // 'selector-combinator-space-before': 'always',
    // 'selector-list-comma-space-before': 'never',
    // 'selector-max-empty-lines': 0,
    // 'selector-pseudo-class-case': 'lower',
    // 'selector-pseudo-class-no-unknown': true,
    // 'selector-pseudo-class-parentheses-space-inside': 'never',
    // 'selector-pseudo-element-case': 'lower',
    // 'selector-type-case': 'lower',
    // 'selector-type-no-unknown': true,
    // 'string-no-newline': null,

    // 'unit-case': 'lower',
    // 'unit-no-unknown': true,
    // 'value-list-comma-newline-after': 'always-multi-line',
    // 'value-list-comma-space-after': 'always-single-line',
    // 'value-list-comma-space-before': 'never',

    indentation: [2, {
      ignore: ['inside-parens']
    }],


    // 'scss/partial-no-import': true,
    // 'at-rule-name-case': 'lower',
    // 'at-rule-name-newline-after': 'always-multi-line',
    //
    // 'block-closing-brace-newline-after': 'always-multi-line',

    //
    // 'block-no-single-line': true,
    //
    // 'block-opening-brace-newline-after': 'always-multi-line',
    //
    //
    //
    // 'comment-no-empty': true,
    //
    //
    // 'declaration-block-no-ignored-properties': true,
    // 'declaration-block-no-shorthand-property-overrides': true,
    //
    // 'declaration-block-semicolon-newline-after': 'always-multi-line',
    // 'declaration-block-semicolon-newline-before': 'never-multi-line',
    // 'declaration-block-semicolon-space-after': 'always-single-line',
    //
    // 'declaration-colon-newline-after': 'always-multi-line',
    // 'declaration-colon-space-before': 'never',
    //
    // 'declaration-empty-line-before': 'never',
    //
    // 'font-family-name-quotes': 'always-where-required',
    // 'function-calc-no-unspaced-operator': true,
    //
    // 'function-comma-newline-after': 'never-multi-line',
    // 'function-comma-newline-before': 'never-multi-line',
    // 'function-comma-space-before': 'never-single-line',
    //
    // 'function-linear-gradient-no-nonstandard-direction': true,
    // 'function-max-empty-lines': 5,
    //
    // 'function-name-case': 'lower',
    // 'function-parentheses-newline-inside': 'always-multi-line',
    // 'function-parentheses-space-inside': 'never-single-line',
    // 'function-url-quotes': 'always',
    // 'function-whitespace-after': 'always',
    //
    //
    // 'max-empty-lines': 10,
    // 'max-line-length': 180,
    //
    // 'media-feature-colon-space-after': 'always',
    // 'media-feature-colon-space-before': 'never',
    // 'media-feature-name-case': 'lower',
    // 'media-feature-no-missing-punctuation': true,
    // 'media-feature-range-operator-space-after': 'always',
    // 'media-feature-range-operator-space-before': 'always',
    // 'media-query-list-comma-newline-after': 'always-multi-line',
    // 'media-query-list-comma-newline-before': 'never-multi-line',
    // 'media-query-list-comma-space-after': 'always-single-line',
    // 'media-query-list-comma-space-before': 'never',
    //
    // 'no-duplicate-selectors': true,
    // 'no-empty-source': true,
    // 'no-eol-whitespace': true,
    // 'no-extra-semicolons': true,
    // 'no-indistinguishable-colors': true,
    // 'no-unknown-animations': true,
    //
    // 'number-max-precision': 7,
    //
    // 'property-case': 'lower',
    //
    // 'root-no-standard-properties': true,
    //
    // 'rule-nested-empty-line-before': ['always', {
    //   ignore: ['after-comment']
    // }],
    //
    // 'selector-attribute-brackets-space-inside': 'never',
    // 'selector-attribute-operator-space-after': 'never',
    // 'selector-attribute-operator-space-before': 'never',
    // 'selector-attribute-quotes': 'always',
    //
    // 'selector-combinator-space-after': 'always',
    // 'selector-combinator-space-before': 'always',
    //
    // 'selector-list-comma-newline-before': 'never-multi-line',
    // 'selector-list-comma-space-after': 'always-single-line',
    // 'selector-list-comma-space-before': 'never',
    //
    // 'selector-max-empty-lines': 5,
    //
    // 'selector-pseudo-class-case': 'lower',
    // 'selector-pseudo-class-no-unknown': true,
    // 'selector-pseudo-class-parentheses-space-inside': 'never',
    //
    // 'selector-pseudo-element-case': 'lower',
    //
    // 'selector-root-no-composition': true,
    // 'selector-type-case': 'lower',
    // 'selector-type-no-unknown': true,
    //
    //
    // 'string-no-newline': true,
    //
    // 'unit-case': 'lower',
    // 'unit-no-unknown': true,
    //
    // 'value-list-comma-newline-after': 'always-multi-line',
    // 'value-list-comma-newline-before': 'never-multi-line',
    // 'value-list-comma-space-after': 'always-single-line',
    // 'value-list-comma-space-before': 'never',
  },
};
