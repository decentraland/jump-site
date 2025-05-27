/* eslint-env node */
module.exports = {
  extends: ['@dcl/eslint-config/dapps'],
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json']
  },
  rules: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'import',
        format: ['camelCase', 'PascalCase']
      }
    ]
  }
}
