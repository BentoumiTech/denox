module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
  ],
  rules: {
    "@typescript-eslint/ban-ts-ignore": 0,
    "no-console": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/camelcase": 0,
    "no-prototype-builtins": 0,
    "max-lines-per-function": [
      "error",
      {
        "max": 20,
        "skipComments": true
      },
    ],
  },
  "overrides": [
    {
      "files": ["*.test.ts"],
      "rules": {
        "max-lines-per-function": 0,
      },
    },
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
};
