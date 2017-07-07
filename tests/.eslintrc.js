module.exports = {
  env: {
    embertest: true
  },
  rules: {
    // Chai is dumb and uses side-effected getters instead of methods because they think it looks
    // better and they apparently give no $&*#s about best practices. ESLint (correctly) interprets
    // those chains as property access expressions, so we have to disable the whole darn rule
    'no-unused-expressions': 'off',
  }
};
