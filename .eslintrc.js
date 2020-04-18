module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react',//Integração do prettier com o react
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: 'readonly'
  },
  parser: 'babel-eslint',//Isso faz com que o código interprete as últimas versões do js
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'//Também necessário para integração do prettier com o react
  ],
  rules: {
      'prettier/prettier': 'error',
      'react/jsx-filename-extension':[
          'warn',
          {
                //ESlint vai dar um aviso APENAS quando as extensões não forem as do array abaixo
                extensions:['.jsx','.js']
          }
      ],
      //Essa config garante que os arquivos possam ter 'exports' que não sejam apenas 'exports default'
      'import/prefer-default-export': 'off'
  },
};
