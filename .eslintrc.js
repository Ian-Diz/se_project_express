module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  _id: {
    rules: {
      "no-underscore-dangle": ["error", { allow: ["_id"] }],
    },
  },
};
