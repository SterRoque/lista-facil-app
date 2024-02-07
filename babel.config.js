module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      }
    },
    plugins: [
      '@babel/transform-react-jsx-source',
      'babel-plugin-transform-typescript-metadata',
      [
        'module-resolver',
        {
          root: './src',
          extensions: [
            '.ios.js',
            '.android.js',
            'ios.tsx',
            'android.tsx',
            '.js',
            '.ts',
            '.tsx',
            '.json',
          ],
        },
      ],
    ],
  }
}
