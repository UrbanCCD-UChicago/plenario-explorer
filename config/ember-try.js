module.exports = {
  scenarios: [
    {
      name: 'default',
      dependencies: {},
    },
    {
      name: 'lts',
      npm: {
        devDependencies: {
          'ember-source': 'lts',
        },
      },
    },
    {
      name: 'release',
      npm: {
        devDependencies: {
          'ember-source': 'latest',
        },
      },
    },
    {
      name: 'beta',
      npm: {
        devDependencies: {
          'ember-source': 'beta',
        },
      },
    },
  ],
};
