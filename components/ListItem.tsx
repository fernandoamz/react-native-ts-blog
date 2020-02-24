import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ListItem = (props: any) => {
  return (
    <TouchableOpacity>
      <View style={styles.listItem}>
        <Text>{props.placeName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    marginTop: 20,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
});

export default ListItem;
