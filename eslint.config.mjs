import _import from "eslint-plugin-import";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: ["**/build", "**/dist", "**/node_modules", "**/package-lock.json", "**/tsconfig.json", "**/yarn.lock"],
    },
    ...compat.extends("plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"),
    {
        plugins: {
            import: fixupPluginRules(_import),
            "@typescript-eslint": typescriptEslint,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
            },

            parser: tsParser,
            ecmaVersion: 2020,
            sourceType: "module",

            parserOptions: {
                tsconfigRootDir: "./",
            },
        },

        settings: {
            "import/extensions": [".js", ".ts"],

            "import/parsers": {
                "@typescript-eslint/parser": [".ts"],
            },

            "import/resolver": {
                node: {
                    extensions: [".js", ".ts"],
                },

                typescript: {},
            },
        },

        rules: {
            "import/extensions": [
                "error",
                "ignorePackages",
                {
                    js: "never",
                    ts: "never",
                },
            ],

            "no-console": [
                "error",
                {
                    allow: ["info", "warn", "error"],
                },
            ],

            "multiline-ternary": 0,
            "no-unused-vars": "off",
            "no-shadow": 0,
            "@typescript-eslint/no-unused-vars": "error",
            "no-useless-constructor": "off",
            "@typescript-eslint/no-useless-constructor": "error",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-empty-interface": "off",
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/no-non-null-assertion": "off",

            "max-len": [
                "warn",
                {
                    code: 120,
                    tabWidth: 2,
                    comments: 120,
                    ignoreComments: false,
                    ignoreTrailingComments: true,
                    ignoreUrls: true,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                    ignoreRegExpLiterals: true,
                },
            ],
        },
    },
];
