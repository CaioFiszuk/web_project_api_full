const airbnbBase = require("eslint-config-airbnb-base");

[
  airbnbBase,
  {
    ignores: ["node_modules"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
        "no-underscore-dangle": "off",
        "no-console": "off",
        "linebreak-style": ["error", "unix"],
        "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
    },
  },
];