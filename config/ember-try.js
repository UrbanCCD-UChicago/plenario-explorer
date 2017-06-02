module.exports = {
  scenarios: [
    {
      name: 'default',
      dependencies: {},
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
