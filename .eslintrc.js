module.exports = {
    ignorePatterns: ["**/*.js", "**/*.json"], // we're only linting ts files
    parser: "@typescript-eslint/parser",
    extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
        "plugin:jest/recommended",
        "plugin:jest/style",
    ],
    plugins: ["import", "unused-imports", "react-hooks", "jest"],
    parserOptions: {
        project: ["tsconfig.json", "cypress/tsconfig.json"],
        sourceType: "module", // Allows for the use of imports
    },
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/naming-convention": [
            "error",
            {
                selector: "interface",
                format: ["PascalCase"],
                custom: {
                    regex: "^I[A-Z]", // we want that interface start with I
                    match: true,
                },
            },
            {
                selector: "enum",
                format: ["PascalCase"],
                custom: {
                    regex: "^Enum[A-Z]", // we want that enums start with Enum
                    match: true,
                },
            },
        ],
        "unused-imports/no-unused-imports-ts": "error", // for automatically removing unused imports
        "import/order": "error", // we ensure a consistent import order
        "@typescript-eslint/no-non-null-assertion": "off",
        "no-console": "error",

        "react-hooks/rules-of-hooks": "error",
    },
    settings: {
        react: {
            version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
};
