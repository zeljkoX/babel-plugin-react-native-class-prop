import { evaluateClass } from 'babel-plugin-react-native-class-prop';

function App(props) {
    return (
        <Paragraph style={{ justifyContent: "center" }} passStyle={evaluateClass("flex justify-center")}>
            Hello world
        </Paragraph>
    );
}
