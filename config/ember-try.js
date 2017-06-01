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
          ember: 'latest',
        },
      },
    },
    {
      name: 'beta',
      dependencies: {
        ember: 'beta',
      },
    },
  ],
};
