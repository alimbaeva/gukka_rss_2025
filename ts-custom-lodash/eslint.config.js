import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
    plugins: { "@typescript-eslint": ts },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      "no-console": "warn",
    },
    ignores: ["node_modules/", "dist/"],
  },
];
