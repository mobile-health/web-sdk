import { config } from "@web-sdk/eslint-config/base";

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    ignores: ['dist/**'],
  },
];
