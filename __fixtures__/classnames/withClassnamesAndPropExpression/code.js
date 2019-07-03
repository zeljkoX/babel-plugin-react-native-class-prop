function App(props) {
    return (
        <Paragraph class={[{ 'justify-center': props.test }]}>
            Hello world
        </Paragraph>
    );
}
