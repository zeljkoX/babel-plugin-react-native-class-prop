const path = require('path');
const tester = require('babel-plugin-tester');

const fixtures = path.join(__dirname, '..', '__fixtures__');

tester({
  title: 'classnames tests',
  plugin: require('../'),
  pluginName: 'babel-plugin-react-native-class-prop',
  pluginOptions: {
    propName: 'class',
    classes: {
      flex: { flex: 1 },
      'justify-center': { justifyContent: 'center' },
    },
  },
  fixtures: path.join(fixtures, 'classnames'),
});
