function App(props) {
  return <Paragraph style={[props.test && {
    "justifyContent": "center"
  }]}>
            Hello world
        </Paragraph>;
}