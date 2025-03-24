/* eslint-env node */
module.exports = {
  extends: ['@dcl/eslint-config/dapps'],
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json']
  }
}
