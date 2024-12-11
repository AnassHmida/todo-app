module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['react-native-web', {commonjs: true}],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
};
