import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

const sharedIgnores = ["dist/**", "coverage/**", "node_modules/**", "__mocks__/**"];
const sharedGlobals = {
  ...globals.browser,
  ...globals.node,
};

export default defineConfig([
  {
    ignores: sharedIgnores,
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: sharedGlobals,
    },
  },
  ...tseslint.configs.recommended,
]);
