'use strict';

module.exports = {
  root: true,
  extends: [
    'crowdstrike-node',
  ],
  rules: {
    // https://github.com/eslint/eslint/issues/11899
    'require-atomic-updates': 'off',

    'faltest/no-browser-throttle': 'error',
  },
  overrides: [
    {
      files: [
        'packages/*/test/**/*-test.js',
        'packages/mocha/src/role.js',
        'examples/*/tests/**/*-test.js',
      ],
      env: {
        mocha: true,
      },
      plugins: [
        'mocha',
        'faltest',
      ],
      extends: 'plugin:mocha/recommended',
      rules: {
        'mocha/no-hooks-for-single-case': 'off',
        'mocha/no-setup-in-describe': 'off',
        'mocha/no-identical-title': 'off',
        'mocha/no-nested-tests': 'off',
        'mocha/no-pending-tests': 'off',

        'faltest/chai-webdriver-eventually': 'error',
        'faltest/mocha-roles-only': 'error',
      },
    },
    {
      files: [
        'package.json',
        'examples/*/package.json',
      ],
      rules: {
        // https://github.com/kellyselden/eslint-plugin-json-files/issues/2
        'json-files/require-license': 'off',
      },
    },
    {
      files: [
        'examples/**/*.js',
      ],
      rules: {
        // https://github.com/mysticatea/eslint-plugin-node/issues/77
        'node/no-unpublished-require': 'off',
      },
    },
  ],
};