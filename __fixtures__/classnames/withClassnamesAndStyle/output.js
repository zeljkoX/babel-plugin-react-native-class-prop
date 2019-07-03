function App(props) {
  return <Paragraph style={[{
    height: 100
  }, {
    "flex": 1
  }, true && {
    "justifyContent": "center"
  }]}>
            Hello world
        </Paragraph>;
}