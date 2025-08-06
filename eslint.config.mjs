import { FlatCompat } from '@eslint/eslintrc';
import prettierConfig from 'eslint-config-prettier';
import pluginEsLintImport from 'eslint-plugin-import';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const overrides = {
  rules: {
    'max-len': ['warn', { code: 100 }],
  },
};

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      'simple-import-sort': pluginSimpleImportSort,
      import: pluginEsLintImport,
    },
    rules: {
      // simple-import-sort rules
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // eslint-plugin-import rules
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/max-dependencies': ['warn', { max: 10, ignoreTypeImports: true }],
      semi: [2, 'always'],
    },
  },
  prettierConfig,
  overrides,
];

export default eslintConfig;
