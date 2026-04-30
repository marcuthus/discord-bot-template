import prettier from "eslint-plugin-prettier/recommended"
import unusedImports from "eslint-plugin-unused-imports"
import perfectionist from "eslint-plugin-perfectionist"
import tseslint from "typescript-eslint"
import eslint from "@eslint/js"

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    prettier,
    {
        plugins: {
            perfectionist,
            "unused-imports": unusedImports
        },
        rules: {
            "prettier/prettier": "error",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_"
                }
            ],
            "perfectionist/sort-imports": [
                "error",
                {
                    type: "line-length",
                    order: "desc",
                    groups: ["builtin", "external", "internal", "parent", "sibling", "index"]
                }
            ]
        }
    },
    {
        ignores: ["node_modules/", "dist/", "package-lock.json"]
    }
)
