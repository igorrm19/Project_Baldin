import jsImport from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
// @ts-ignore
import securityImport from "eslint-plugin-security";
// @ts-ignore
import unicornImport from "eslint-plugin-unicorn";
// @ts-ignore
import sonarImport from "eslint-plugin-sonarjs";
// @ts-ignore
import noUnsanitizedImport from "eslint-plugin-no-unsanitized";

const js = (jsImport as any).default ?? jsImport;
const security = (securityImport as any).default ?? securityImport;
const unicorn = (unicornImport as any).default ?? unicornImport;
const sonar = (sonarImport as any).default ?? sonarImport;
const noUnsanitized = (noUnsanitizedImport as any).default ?? noUnsanitizedImport;

const sharedIgnores = ["dist/**", "coverage/**", "node_modules/**", "__mocks__/**", "eslint.config.ts"];
const sharedGlobals = {
  ...globals.browser,
  ...globals.node,
};

const securityRules = Object.fromEntries(
  Object.entries((security as any).configs.recommended.rules).map(([name]) => [name, "error"])
) as Record<string, string>;

export default tseslint.config(
  {
    ignores: sharedIgnores,
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
      globals: sharedGlobals,
    },
    plugins: {
      security: security as any,
      unicorn: unicorn as any,
      sonarjs: sonar as any,
      "no-unsanitized": noUnsanitized as any,
    },
    rules: {
      ...securityRules,
      "unicorn/prefer-module": "error",
      "unicorn/no-abusive-eslint-disable": "error",
      "unicorn/error-message": "error",
      "sonarjs/cognitive-complexity": ["error", 15],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "no-unsanitized/method": "error",
      "no-unsanitized/property": "error",
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
      globals: sharedGlobals,
    },
  }
);
