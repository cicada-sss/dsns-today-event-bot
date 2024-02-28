module.exports = {
  root: true,
  parserOptions: {
    requireConfigFile: false,
    sourceType: "module",
    allowImportExportEverywhere: true,
    babelOptions: {
      presets: ["next/babel"],
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ["airbnb", "plugin:prettier/recommended"],
  ignorePatterns: [".next/", "examples/", "node_modules/", "public/"],
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        warnOnUnsupportedTypeScriptVersion: true,
        tsconfigRootDir: ".",
      },
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
          },
        ],
        "react/no-unknown-property": ["error", { ignore: ["css"] }],
        "react/jsx-filename-extension": [
          "error",
          {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
          },
        ],
        "import/order": [
          "error",
          {
            alphabetize: {
              order: "asc",
              caseInsensitive: true,
            },
            "newlines-between": "always",
            groups: ["builtin", "external", "parent", "sibling", "index"],
            pathGroups: [
              {
                pattern: "react",
                group: "external",
                position: "before",
              },
              {
                pattern: "@/**",
                group: "external",
                position: "after",
              },
            ],
            pathGroupsExcludedImportTypes: ["builtin"],
          },
        ],
        "import/extensions": "off",
        "import/no-unresolved": "off",
        "import/prefer-default-export": "off",
        "react/react-in-jsx-scope": "off",
        "react/require-default-props": "off",
      },
    },
  ],
};
