"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_redux_1 = require("react-redux");
const place_1 = require("../actions/place");
const ListItem_1 = __importDefault(require("./ListItem"));
function App(props) {
    const [name, setName] = react_1.useState('');
    function _handlePlaceSubmit() {
        props.add(name);
    }
    function _handlePlaceRemove(key) {
        props.remove(key);
    }
    function getListPlaces() {
        const list = props.places;
        if (list) {
            return (react_1.default.createElement(react_native_1.FlatList, { style: styles.listContainer, data: props.places, keyExtractor: (index) => index.toString(), renderItem: info => (react_1.default.createElement(ListItem_1.default, { placeName: info.item.value, handlePlaceRemove: () => _handlePlaceRemove(info.item.key) })) }));
        }
        return react_1.default.createElement(react_native_1.Text, null, 'Empty list ...');
    }
    return (react_1.default.createElement(react_native_1.View, { style: styles.container },
        react_1.default.createElement(react_native_1.View, { style: styles.inputContainer },
            react_1.default.createElement(react_native_1.TextInput, { placeholder: "Type ...", style: styles.placeInput, value: name, onChangeText: text => {
                    setName(text);
                } }),
            react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: _handlePlaceSubmit, style: styles.placeButton },
                react_1.default.createElement(react_native_1.Text, { style: styles.buttonStyles }, "Add"))),
        getListPlaces()));
}
const styles = react_native_1.StyleSheet.create({
    container: {
        margin: 20,
        paddingTop: 100,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    placeInput: {
        width: '70%',
        height: 20,
        borderWidth: 1,
        borderBottomColor: 'black',
        borderRightColor: 'white',
        borderLeftColor: 'white',
        borderTopColor: 'white',
        marginTop: 20,
    },
    placeButton: {
        width: 100,
        backgroundColor: 'blue',
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyles: {
        color: 'white',
        fontWeight: 'bold',
    },
    listContainer: {
        width: '100%',
    },
    listView: {
        marginTop: 20,
        marginRight: 'auto',
    },
});
const mapStateProps = (state) => {
    return {
        places: state.places.places,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        add: (name) => {
            dispatch(place_1.addPlace(name));
        },
        remove: (key) => {
            dispatch(place_1.removePlace(key));
        },
    };
};
exports.default = react_redux_1.connect(mapStateProps, mapDispatchToProps)(App);
