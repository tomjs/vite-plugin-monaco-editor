module.exports = {
  env: {
    node: true,
    es6: true,
  },
  globals: {
    monaco: true,
  },
  extends: [require.resolve('@tomjs/eslint/vue/typescript')],
};
