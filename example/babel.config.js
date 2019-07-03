const classes = require('./classes');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      '../',
      {
        propName: 'class',
        classes,
      },
    ],
  ],
};
