"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const ListItem = (props) => {
    return (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: () => props.handlePlaceRemove(props.placeName) },
        react_1.default.createElement(react_native_1.View, { style: styles.listItem },
            react_1.default.createElement(react_native_1.Text, null, props.placeName))));
};
const styles = react_native_1.StyleSheet.create({
    listItem: {
        width: '100%',
        marginTop: 20,
        marginBottom: 5,
        backgroundColor: '#fff',
    },
});
exports.default = ListItem;
