function App(props) {
  return <Paragraph style={[{
    "flex": 1
  }, true && {
    "justifyContent": "center"
  }, {
    height: 100
  }, {
    width: 100
  }]}>
            Hello world
        </Paragraph>;
}