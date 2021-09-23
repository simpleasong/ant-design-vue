module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-tabs": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": "off",
    'space-before-function-paren': 0,
    "linebreak-style": "off",
    "arrow-body-style": "off",
    "no-bitwise": ["error", { "allow": ["~"] }],
    "no-continue": "off",
    "max-len": ["error", 100],
    "no-unused-vars": 0,
    "react/jsx-space-before-closing": 0,
    "react/jsx-indent": 0,
    "no-empty": 0,
    "no-undef": 0
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
