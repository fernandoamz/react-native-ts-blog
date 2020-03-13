import React, {useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';

const themes = {
  light: {
    background: '#eeeeee',
    title: 'This is a light counter example',
  },
  dark: {
    background: '#222222',
    title: 'This is a dark counter example',
  },
};

const ThemeContext = React.createContext(themes.light);

function ToolBar() {
  return (
    <ThemeContext.Provider value={themes.light}>
      <ThemedToolbar />
    </ThemeContext.Provider>
  );
}

function ThemedToolbar() {
  const theme = useContext(ThemeContext);

  return (
    <View style={styles.marginView}>
      <View
        style={Object.assign(
          {backgroundColor: theme.background},
          styles.viewText,
        )}>
        <Text>{theme.title}</Text>
      </View>
    </View>
  );
}

export default ToolBar;

const styles = StyleSheet.create({
  marginView: {
    marginTop: 100,
  },
  textColor: {
    color: 'blue',
    fontWeight: 'bold',
    marginLeft: 60,
  },
  viewText: {
    width: '80%',
    height: 40,
    marginLeft: 30,
  },
});
