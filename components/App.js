"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_redux_1 = require("react-redux");
const incrementer_1 = require("../actions/incrementer");
function App(props) {
    const [automaticIncrement, setAutomaticIncrement] = react_1.useState(false);
    const [automaticDecrement, setAutomaticDecrement] = react_1.useState(false);
    const [stop, setStop] = react_1.useState(true);
    react_1.useEffect(() => {
        if (automaticIncrement && !stop) {
            setTimeout(() => {
                props.increment(props.counter.counter);
            }, 100);
        }
        if (automaticDecrement && !stop) {
            setTimeout(() => {
                props.decrement(props.counter.counter);
            }, 100);
        }
    });
    return (react_1.default.createElement(react_native_1.View, { style: styles.containerView },
        react_1.default.createElement(react_native_1.Text, null, props.counter.counter),
        react_1.default.createElement(react_native_1.Button, { title: "Increment", onPress: () => props.increment(props.counter.counter) }),
        react_1.default.createElement(react_native_1.Button, { title: "Decrement", onPress: () => props.decrement(props.counter.counter) }),
        react_1.default.createElement(react_native_1.Button, { title: "Auto Increment", onPress: () => {
                setAutomaticIncrement(true);
                setAutomaticDecrement(false);
                setStop(false);
            } }),
        react_1.default.createElement(react_native_1.Button, { title: "Auto Decrement", onPress: () => {
                setAutomaticIncrement(false);
                setAutomaticDecrement(true);
                setStop(false);
            } }),
        react_1.default.createElement(react_native_1.Button, { title: "Stop", onPress: () => {
                setStop(!stop);
            } })));
}
const mapStateProps = (state) => {
    return {
        counter: state.counter,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        increment: (counter) => {
            dispatch(incrementer_1.incrementCount(counter));
        },
        decrement: (counter) => {
            dispatch(incrementer_1.decrementCount(counter));
        },
    };
};
exports.default = react_redux_1.connect(mapStateProps, mapDispatchToProps)(App);
const styles = react_native_1.StyleSheet.create({
    containerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
