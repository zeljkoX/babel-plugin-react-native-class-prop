# babel-plugin-react-native-class-prop

Are you tired of defining same styles across your project? This snippet look known to You?

```Javascript
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
```

`babel-plugin-react-native-class-prop` enables defining collection of global styles that can be used anywhere in project via `class` props. This plugin recreates way of using global styles as on the web.

## Usage

Install the plugin:

```sh
yarn add --dev babel-plugin-react-native-class-prop
```

or

```sh
npm install --save-dev babel-plugin-react-native-class-prop
```

Then include it in your `.babelrc` or `babel.config.js`:

```json
{
  "plugins": ["react-native-class-prop", {
    classes: {
      flex: {
        flex: 1
      },
      'justify-center': {
        justifyContent: 'center'
      }
    }
  }]
}
```

## Example

Now you can use the `class` prop in your components:

```js
function App(props) {
  return (
    <View
      class="flex justify-center"
    >
      Hello world
    </View>
  );
}
```

If class should be applied conditionally this plugin supports syntax similar to `classnames` package:

```js
function App(props) {
  return (
    <View
      class={["flex", { "justify-center": props.center }]}
    >
      Hello world
    </View>
  );
}
```

Sometimes if You just need to pass some class definitions as prop to sub component `evaluateClass` function do the job.

```js
import { evaluateClass } from 'babel-plugin-react-native-class-prop';

function App(props) {
  return (
    <Paragraph
      passClassToSubComponent={evaluateClass('flex')}
    >
      Hello world
    </Paragraph>
  );
}
```

Using `class` prop does not mean You shouldn't use old way, the `style` prop. These two props should be used in combination. `style` prop should be used for styles that are not addded to babel configuration file, or they are just defined in runtime, computed in render method...

## Babel plugin options

- `propName`: Default value is `class`. But if You want to use something more appropriate for your needs it can be changed here.
- `classes`: Object that contain global classes definitions. It has same format as any style created with `StyleSheet.create`. Bare in mind that babel uses older JS syntax for configuration file and at this step babel plugins are not applied to project files.

## Classes are not working

Please restart react-native packager with `npm start -- --reset-cache` command. Sometimes when new classes are added packager still use cached ones.

## TODO

- error handling for unsupported cases
- support robust cases
- typescript types
- semantic release
