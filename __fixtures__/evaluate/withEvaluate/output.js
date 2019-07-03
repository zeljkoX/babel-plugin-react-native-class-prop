import { evaluateClass } from 'babel-plugin-react-native-class-prop';

function App(props) {
  return <Paragraph style={{
    justifyContent: "center"
  }} passStyle={[{
    "flex": 1
  }, {
    "justifyContent": "center"
  }]}>
            Hello world
        </Paragraph>;
}
