import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {connect} from 'react-redux';
import {addPlace, removePlace} from '../actions/place';
import ListItem from './ListItem';

function App(props: any) {
  const [name, setName] = useState('');

  function _handlePlaceSubmit() {
    props.add(name);
    setName('');
  }

  function _handlePlaceRemove(key: number) {
    props.remove(key);
  }

  function getListPlaces() {
    const list: Array<any> = props.places;

    if (list) {
      return (
        <FlatList
          style={styles.listContainer}
          data={props.places}
          keyExtractor={(index: any) => index.toString()}
          renderItem={info => (
            <ListItem
              placeName={info.item.value}
              handlePlaceRemove={() => _handlePlaceRemove(info.item.key)}
            />
          )}
        />
      );
    }

    return <Text>{'Empty list ...'}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type ..."
          style={styles.placeInput}
          value={name}
          onChangeText={text => {
            setName(text);
          }}
        />
        <TouchableOpacity
          onPress={_handlePlaceSubmit}
          style={styles.placeButton}>
          <Text style={styles.buttonStyles}>Add</Text>
        </TouchableOpacity>
      </View>
      {getListPlaces()}
    </View>
  );
}

const styles = StyleSheet.create({
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

const mapStateProps = (state: any) => {
  return {
    places: state.places.places,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    add: (name: any) => {
      dispatch(addPlace(name));
    },

    remove: (key: number) => {
      dispatch(removePlace(key));
    },
  };
};

export default connect(
  mapStateProps,
  mapDispatchToProps,
)(App);
