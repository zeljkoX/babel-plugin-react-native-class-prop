function App(props) {
  return <Paragraph style={[true && {
    "justifyContent": "center"
  }, true && {
    "flex": 1
  }]}>
            Hello world
        </Paragraph>;
}