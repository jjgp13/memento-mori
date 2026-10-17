// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    // supabase/functions is Deno code (npm: imports), not part of the app.
    ignores: ["dist/*", "supabase/functions/*"],
  }
]);
