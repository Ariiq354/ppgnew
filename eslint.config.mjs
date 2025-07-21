// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "vue/no-multiple-template-root": "off",
    "vue/html-self-closing": "off",
  },
});
