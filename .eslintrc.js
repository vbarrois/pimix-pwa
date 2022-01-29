module.exports = {
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  parserOptions: {
    parser: "@babel/eslint-parser",
    ecmaVersion: 2020,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    // override/add rules settings here, such as:
    "no-unused-vars": 1,
  }
}
