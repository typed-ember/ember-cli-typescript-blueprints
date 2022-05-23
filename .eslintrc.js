module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  plugins: ['ember'],
  extends: ['eslint:recommended', 'plugin:ember/recommended'],
  env: {
    browser: true,
  },
  rules: {},
  overrides: [
    // blueprint generators
    {
      files: [
        'blueprints/*.js',
        'blueprints/**/index.js',
        'lib/utilities/extend-from-application-entity.js',
      ],
      rules: {
        'ember/no-string-prototype-extensions': 'off',
      },
    },
    // node files
    {
      files: [
        './.eslintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*.js', // test-framework-detector.js
        'blueprints/*/*.js', // index.js for each blueprint
        'config/**/*.js',
        'tests/dummy/config/**/*.js',
        'lib/**/*.js',
        'node-tests/**/*.js', // mocha test files
      ],
      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**',
        'node-tests/fixtures/**',
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015,
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
      rules: Object.assign({}, require('eslint-plugin-node').configs.recommended.rules, {
        // add your custom rules and overrides for node files here
      }),
    },

    // node tests
    {
      files: ['node-tests/**/*.js'],
      env: {
        mocha: true,
      },
      rules: {
        'node/no-unpublished-require': 'off',
      },
    },
  ],
};
